/**
 * Gera `src/lib/dados-geometria.ts`: vértices e faces dos seis sólidos do dado
 * de RPG.
 *
 * Só a geometria sai daqui. Quem gira, projeta e descarta as faces de trás é
 * `src/lib/projecao.ts`, porque isso roda de novo a cada quadro quando os dados
 * seguem o mouse — não dá pra ser um path fixo assado no build.
 *
 * A detecção de face fica neste script (roda uma vez, na mão do dev) pra não
 * viajar pro navegador junto.
 *
 * Uso: pnpm gerar:dados
 */
import { writeFileSync } from "node:fs";

const PHI = (1 + Math.sqrt(5)) / 2;

/* --- Vértices ------------------------------------------------------------- */

const TETRAEDRO = [
  [1, 1, 1],
  [1, -1, -1],
  [-1, 1, -1],
  [-1, -1, 1],
];

const CUBO = [-1, 1].flatMap((x) =>
  [-1, 1].flatMap((y) => [-1, 1].map((z) => [x, y, z])),
);

const OCTAEDRO = [
  [1, 0, 0], [-1, 0, 0],
  [0, 1, 0], [0, -1, 0],
  [0, 0, 1], [0, 0, -1],
];

/** Permutações cíclicas de (0, ±a, ±b). */
function ciclicas(a, b) {
  const base = [];
  for (const s1 of [-1, 1]) {
    for (const s2 of [-1, 1]) {
      base.push([0, s1 * a, s2 * b], [s1 * a, s2 * b, 0], [s2 * b, 0, s1 * a]);
    }
  }
  return base;
}

const ICOSAEDRO = ciclicas(1, PHI);
const DODECAEDRO = [...CUBO, ...ciclicas(1 / PHI, PHI)];

/**
 * Trapezoedro pentagonal, o d10: dois anéis de cinco defasados em 36° e dois
 * ápices. As proporções são as do dado de mesa, não as do sólido ideal.
 */
function trapezoedro() {
  const anel = (z, giro) =>
    Array.from({ length: 5 }, (_, i) => {
      const a = ((i * 72 + giro) * Math.PI) / 180;
      return [Math.cos(a), Math.sin(a), z];
    });

  const cima = anel(0.34, 0);
  const baixo = anel(-0.34, 36);
  return { cima, baixo, norte: [0, 0, 1.15], sul: [0, 0, -1.15] };
}

/* --- Faces ---------------------------------------------------------------- */

const produto = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

/**
 * Faces por detecção de plano: pega cada vértice com dois vizinhos, monta o
 * plano dos três e recolhe todo mundo que cai nele.
 *
 * A primeira versão usava as direções do sólido dual como normais, e o d12 saiu
 * uma teia: o icosaedro que eu gero está girado em relação ao dual do meu
 * dodecaedro, então as "faces" juntavam vértices de planos diferentes. Achar o
 * plano no próprio sólido não depende de os dois conjuntos estarem alinhados.
 */
function facesPorPlano(vertices, porFace) {
  const distancia = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

  let aresta = Infinity;
  for (let i = 0; i < vertices.length; i += 1) {
    for (let j = i + 1; j < vertices.length; j += 1) {
      aresta = Math.min(aresta, distancia(vertices[i], vertices[j]));
    }
  }

  const vizinhos = vertices.map((v, i) =>
    vertices
      .map((w, j) => ({ j, d: distancia(v, w) }))
      .filter(({ j, d }) => j !== i && Math.abs(d - aresta) < 1e-6)
      .map(({ j }) => j),
  );

  const encontradas = new Map();

  vertices.forEach((v, i) => {
    for (const a of vizinhos[i]) {
      for (const b of vizinhos[i]) {
        if (a >= b) continue;

        const normal = normalizar(
          cruzado(
            vertices[a].map((valor, eixo) => valor - v[eixo]),
            vertices[b].map((valor, eixo) => valor - v[eixo]),
          ),
        );
        // O sólido é centrado na origem, então a face fica no lado positivo.
        const sentido = produto(normal, v) >= 0 ? 1 : -1;
        const orientada = normal.map((valor) => valor * sentido);
        const altura = produto(orientada, v);

        const noPlano = vertices
          .map((w, indice) => ({ indice, w }))
          .filter(({ w }) => Math.abs(produto(orientada, w) - altura) < 1e-6)
          .map(({ indice }) => indice);

        if (noPlano.length !== porFace) continue;

        const chave = [...orientada, altura].map((n) => n.toFixed(5)).join(",");
        if (!encontradas.has(chave)) {
          encontradas.set(chave, ordenarNoPlano(noPlano, vertices, orientada));
        }
      }
    }
  });

  return [...encontradas.values()];
}

/** Põe os vértices da face em ordem angular, senão o polígono sai cruzado. */
function ordenarNoPlano(indices, vertices, normal) {
  const centro = indices
    .reduce((acc, i) => acc.map((valor, eixo) => valor + vertices[i][eixo]), [0, 0, 0])
    .map((valor) => valor / indices.length);

  // Base local do plano da face.
  const referencia = Math.abs(normal[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0];
  const eixoU = normalizar(cruzado(normal, referencia));
  const eixoV = normalizar(cruzado(normal, eixoU));

  return indices
    .map((i) => {
      const d = vertices[i].map((valor, eixo) => valor - centro[eixo]);
      return { i, angulo: Math.atan2(produto(d, eixoV), produto(d, eixoU)) };
    })
    .sort((a, b) => a.angulo - b.angulo)
    .map(({ i }) => i);
}

const cruzado = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];

function normalizar(v) {
  const tamanho = Math.hypot(...v) || 1;
  return v.map((valor) => valor / tamanho);
}

/* --- Os seis dados ------------------------------------------------------- */

const d10 = (() => {
  const { cima, baixo, norte, sul } = trapezoedro();
  const vertices = [...cima, ...baixo, norte, sul];
  const iNorte = 10;
  const iSul = 11;
  const faces = [];
  for (let i = 0; i < 5; i += 1) {
    faces.push([iNorte, i, 5 + i, (i + 1) % 5]);
    faces.push([iSul, 5 + i, (i + 1) % 5, 5 + ((i + 1) % 5)]);
  }
  return { vertices, faces };
})();

/** A rotação base é a pose de repouso: o que aparece antes de o mouse mexer. */
const DADOS = [
  { nome: "D4", vertices: TETRAEDRO, faces: facesPorPlano(TETRAEDRO, 3), base: [-16, 24] },
  { nome: "D6", vertices: CUBO, faces: facesPorPlano(CUBO, 4), base: [-22, 32] },
  { nome: "D8", vertices: OCTAEDRO, faces: facesPorPlano(OCTAEDRO, 3), base: [-30, 42] },
  { nome: "D10", vertices: d10.vertices, faces: d10.faces, base: [-20, 18] },
  { nome: "D12", vertices: DODECAEDRO, faces: facesPorPlano(DODECAEDRO, 5), base: [-14, 28] },
  { nome: "D20", vertices: ICOSAEDRO, faces: facesPorPlano(ICOSAEDRO, 3), base: [-12, 20] },
];

const FACES_ESPERADAS = { D4: 4, D6: 6, D8: 8, D10: 10, D12: 12, D20: 20 };

const partes = DADOS.map(({ nome, vertices, faces, base }) => {
  // Trava de sanidade: a detecção de face já falhou calada uma vez.
  const esperado = FACES_ESPERADAS[nome];
  if (faces.length !== esperado) {
    throw new Error(`${nome}: ${faces.length} faces, esperado ${esperado}`);
  }

  const emTexto = (n) => Number(n.toFixed(6));

  return `export const ${nome}: Poliedro = {
  vertices: ${JSON.stringify(vertices.map((v) => v.map(emTexto)))},
  faces: ${JSON.stringify(faces)},
  base: ${JSON.stringify(base)},
};`;
});

const conteudo = `// GERADO por scripts/gerar-dados.mjs. Não edite na mão: rode \`pnpm gerar:dados\`.
// \`base\` é a rotação de repouso em graus [x, y].

export type Poliedro = {
  vertices: [number, number, number][];
  faces: number[][];
  base: [number, number];
};

${partes.join("\n\n")}
`;

writeFileSync(new URL("../src/lib/dados-geometria.ts", import.meta.url), conteudo);
console.log(`dados-geometria.ts gerado com ${DADOS.length} sólidos`);
