import type { Poliedro } from "@/lib/dados-geometria";

type Vetor = [number, number, number];

const produto = (a: Vetor, b: Vetor) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

const cruzado = (a: Vetor, b: Vetor): Vetor => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];

function girar([x, y, z]: Vetor, rx: number, ry: number): Vetor {
  const [sx, cx] = [Math.sin(rx), Math.cos(rx)];
  const [sy, cy] = [Math.sin(ry), Math.cos(ry)];
  const y1 = y * cx - z * sx;
  const z1 = y * sx + z * cx;
  return [x * cy + z1 * sy, y1, -x * sy + z1 * cy];
}

/**
 * O raio nunca muda com a rotação, então a escala sai dele e não da caixa dos
 * vértices já girados. Com a caixa o dado inchava e encolhia a cada quadro.
 */
function escalaDe(poliedro: Poliedro, margem: number) {
  const raio = Math.max(...poliedro.vertices.map((v) => Math.hypot(...v)));
  return (100 - margem * 2) / (raio * 2);
}

/**
 * Traçado do poliedro numa dada pose, em graus. Só as arestas das faces de
 * frente: é o descarte das de trás que dá o volume, sem nenhum preenchimento.
 *
 * Roda a cada quadro enquanto o mouse mexe, então evita alocar além do
 * necessário — são no máximo 20 vértices e 20 faces por dado.
 */
export function caminhoDoPoliedro(
  poliedro: Poliedro,
  grausX: number,
  grausY: number,
  margem = 6,
): string {
  const rx = (grausX * Math.PI) / 180;
  const ry = (grausY * Math.PI) / 180;

  const girados = poliedro.vertices.map((v) => girar(v, rx, ry));
  const escala = escalaDe(poliedro, margem);
  // O Y do SVG cresce pra baixo, por isso ele é subtraído.
  const emTela = ([x, y]: Vetor) => [50 + x * escala, 50 - y * escala] as const;

  const vistas = new Set<string>();
  const partes: string[] = [];

  for (const face of poliedro.faces) {
    const a = girados[face[0]];
    const b = girados[face[1]];
    const c = girados[face[2]];

    const normal = cruzado(
      [b[0] - a[0], b[1] - a[1], b[2] - a[2]],
      [c[0] - a[0], c[1] - a[1], c[2] - a[2]],
    );

    let centro: Vetor = [0, 0, 0];
    for (const indice of face) {
      const v = girados[indice];
      centro = [centro[0] + v[0], centro[1] + v[1], centro[2] + v[2]];
    }
    centro = centro.map((valor) => valor / face.length) as Vetor;

    // A normal aponta pra dentro ou pra fora conforme a ordem dos vértices.
    const sentido = produto(normal, centro) >= 0 ? 1 : -1;
    const inclinacao = (normal[2] * sentido) / (Math.hypot(...normal) || 1);
    // Face quase de perfil vira estilhaço de um traço só.
    if (inclinacao <= 0.03) continue;

    for (let i = 0; i < face.length; i += 1) {
      const de = face[i];
      const para = face[(i + 1) % face.length];
      // Aresta entre duas faces visíveis não pode ser traçada duas vezes: em
      // opacidade baixa a linha dobrada aparece mais clara.
      const chave = de < para ? `${de}-${para}` : `${para}-${de}`;
      if (vistas.has(chave)) continue;
      vistas.add(chave);

      const [x1, y1] = emTela(girados[de]);
      const [x2, y2] = emTela(girados[para]);
      partes.push(
        `M${x1.toFixed(2)} ${y1.toFixed(2)}L${x2.toFixed(2)} ${y2.toFixed(2)}`,
      );
    }
  }

  return partes.join("");
}

/** Uma face virada para a frente, já projetada. */
export type FaceVisivel = {
  chave: string;
  /** Pontos no formato do atributo `points` do SVG. */
  pontos: string;
  /** Quanto a face pega de luz, de 0 a 1. */
  luz: number;
};

/** Luz de cima, da frente e um pouco da esquerda — a mesma do dado do app. */
const LUZ: Vetor = [-0.35, 0.62, 0.7];

/**
 * As faces da frente, com a luz de cada uma.
 *
 * `caminhoDoPoliedro` devolve só as arestas, que serve pra um dado de arame. O
 * dado do saquinho é sólido: cada face precisa da própria cor, e é a diferença
 * entre elas que dá a silhueta facetada que se reconhece como dado.
 */
export function facesVisiveis(
  poliedro: Poliedro,
  grausX: number,
  grausY: number,
  margem = 8,
): FaceVisivel[] {
  const rx = (grausX * Math.PI) / 180;
  const ry = (grausY * Math.PI) / 180;

  const girados = poliedro.vertices.map((v) => girar(v, rx, ry));
  const escala = escalaDe(poliedro, margem);
  const emTela = ([x, y]: Vetor) => `${(50 + x * escala).toFixed(2)},${(50 - y * escala).toFixed(2)}`;

  const visiveis: FaceVisivel[] = [];

  poliedro.faces.forEach((face, indice) => {
    const a = girados[face[0]];
    const b = girados[face[1]];
    const c = girados[face[2]];

    const normal = cruzado(
      [b[0] - a[0], b[1] - a[1], b[2] - a[2]],
      [c[0] - a[0], c[1] - a[1], c[2] - a[2]],
    );

    let centro: Vetor = [0, 0, 0];
    for (const i of face) {
      const v = girados[i];
      centro = [centro[0] + v[0], centro[1] + v[1], centro[2] + v[2]];
    }
    centro = centro.map((valor) => valor / face.length) as Vetor;

    const sentido = produto(normal, centro) >= 0 ? 1 : -1;
    const tamanho = Math.hypot(...normal) || 1;
    const unitaria = normal.map((valor) => (valor * sentido) / tamanho) as Vetor;
    if (unitaria[2] <= 0) return;

    // Piso na luz: face de perfil vira preta e o dado perde a borda.
    const luz = Math.max(0, Math.min(1, produto(unitaria, LUZ)));

    visiveis.push({
      chave: `f${indice}`,
      pontos: face.map((i) => emTela(girados[i])).join(" "),
      luz: 0.3 + luz * 0.7,
    });
  });

  return visiveis;
}

/** Uma face projetada, em coordenadas cruas para o canvas. */
export type FaceProjetada = {
  indice: number;
  /** Vértices em pares x,y, num raio de 1 em torno da origem. */
  pontos: number[];
  /** Quanto pega de luz, de 0 a 1. */
  luz: number;
  /** Profundidade do centro. Maior = mais perto da câmera. */
  profundidade: number;
  /** Centro projetado, onde o número é gravado. */
  centro: [number, number];
  /** Quanto a face encara a câmera, de -1 a 1. */
  frontalidade: number;
};

/**
 * Todas as faces projetadas, com luz e profundidade.
 *
 * Diferente de `facesVisiveis`, que devolve string pronta pro SVG: aqui saem
 * números, porque quem desenha é o canvas do saquinho e ele pinta por quadro.
 */
export function facesProjetadas(
  poliedro: Poliedro,
  rx: number,
  ry: number,
): FaceProjetada[] {
  const raio = Math.max(...poliedro.vertices.map((v) => Math.hypot(...v)));
  const girados = poliedro.vertices.map((v) => {
    const [x, y, z] = girar(v, rx, ry);
    return [x / raio, y / raio, z / raio] as Vetor;
  });

  return poliedro.faces.map((face, indice) => {
    const a = girados[face[0]];
    const b = girados[face[1]];
    const c = girados[face[2]];

    const normal = cruzado(
      [b[0] - a[0], b[1] - a[1], b[2] - a[2]],
      [c[0] - a[0], c[1] - a[1], c[2] - a[2]],
    );

    let centro: Vetor = [0, 0, 0];
    for (const i of face) {
      const v = girados[i];
      centro = [centro[0] + v[0], centro[1] + v[1], centro[2] + v[2]];
    }
    centro = centro.map((valor) => valor / face.length) as Vetor;

    const sentido = produto(normal, centro) >= 0 ? 1 : -1;
    const tamanho = Math.hypot(...normal) || 1;
    const unitaria = normal.map((valor) => (valor * sentido) / tamanho) as Vetor;

    const pontos: number[] = [];
    for (const i of face) {
      pontos.push(girados[i][0], -girados[i][1]);
    }

    return {
      indice,
      pontos,
      // Piso na luz: face de perfil vira preta e o dado perde a borda.
      luz: 0.3 + Math.max(0, Math.min(1, produto(unitaria, LUZ))) * 0.7,
      profundidade: centro[2],
      centro: [centro[0], -centro[1]],
      frontalidade: unitaria[2],
    };
  });
}

/**
 * A pose que deixa uma face encarando a câmera.
 *
 * É o inverso de `girar`: procura o par de ângulos que leva a normal da face
 * até +Z. Com `girar` aplicando X e depois Y, dá para resolver em fórmula
 * fechada, sem busca — primeiro o X que zera o Y da normal, depois o Y que zera
 * o X dela.
 *
 * É isto que permite sortear o valor ANTES de a animação começar, como no app:
 * o número não sai de onde o dado parou, a animação é que é levada até ele.
 */
export function poseDaFace(poliedro: Poliedro, indice: number): [number, number] {
  const face = poliedro.faces[indice];
  const [a, b, c] = [
    poliedro.vertices[face[0]],
    poliedro.vertices[face[1]],
    poliedro.vertices[face[2]],
  ];

  const normal = cruzado(
    [b[0] - a[0], b[1] - a[1], b[2] - a[2]],
    [c[0] - a[0], c[1] - a[1], c[2] - a[2]],
  );

  let centro: Vetor = [0, 0, 0];
  for (const i of face) {
    const v = poliedro.vertices[i];
    centro = [centro[0] + v[0], centro[1] + v[1], centro[2] + v[2]];
  }

  const sentido = produto(normal, centro) >= 0 ? 1 : -1;
  const tamanho = Math.hypot(...normal) || 1;
  const [nx, ny, nz] = normal.map((valor) => (valor * sentido) / tamanho);

  const rx = Math.atan2(ny, nz);
  const ry = Math.atan2(-nx, Math.hypot(ny, nz));
  return [rx, ry];
}
