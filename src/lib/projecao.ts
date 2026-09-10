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
