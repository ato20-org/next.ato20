import { D4, D6, D8, D10, D12, D20, type Poliedro } from "@/lib/dados-geometria";

/** Quantas faces. Não é `number`: só existem estes seis sólidos. */
export type FacesDado = 20 | 12 | 10 | 8 | 6 | 4;

export type TipoDado = {
  faces: FacesDado;
  nome: string;
  /** A cor da face virada para a luz. */
  hex: string;
  /** A cor do número. */
  tinta: string;
  poliedro: Poliedro;
  /** Pose de repouso do sólido, em graus. */
  pose: [number, number];
  /**
   * Ajuste de tamanho sobre o raio comum. Raio igual não é tamanho igual: o
   * cubo tem silhueta larga e o icosaedro quase redonda. O d4 é o que mais
   * desvia pra cima — o tetraedro é o sólido que menos aproveita a esfera em
   * que está inscrito. Os números são os do app.
   */
  escala: number;
};

/**
 * Os seis dados, com as cores do saquinho do ATO20.
 *
 * Uma cor por tipo, porque é assim que a mesa chama o dado antes de contar as
 * faces: "me passa o vermelho". Reconhecer a cor é mais rápido que contar lados.
 * Ver `src/types/dado.ts` no app.
 */
export const TIPOS: readonly TipoDado[] = [
  { faces: 20, nome: "d20", hex: "#b91c1c", tinta: "#fee2e2", poliedro: D20, pose: [-12, 20], escala: 1 },
  { faces: 12, nome: "d12", hex: "#7e22ce", tinta: "#f3e8ff", poliedro: D12, pose: [-14, 28], escala: 0.98 },
  { faces: 10, nome: "d10", hex: "#1d4ed8", tinta: "#dbeafe", poliedro: D10, pose: [-20, 18], escala: 1.02 },
  { faces: 8, nome: "d8", hex: "#15803d", tinta: "#dcfce7", poliedro: D8, pose: [-30, 42], escala: 0.92 },
  { faces: 6, nome: "d6", hex: "#b45309", tinta: "#fef3c7", poliedro: D6, pose: [-22, 32], escala: 0.82 },
  { faces: 4, nome: "d4", hex: "#e7e5e4", tinta: "#44403c", poliedro: D4, pose: [-16, 24], escala: 1.22 },
];

/**
 * O número GRAVADO na face. O d10 é o único que começa em zero, como quase todo
 * d10 físico — dois deles dão uma porcentagem.
 */
export function sortearGravado(faces: FacesDado): number {
  const inicio = faces === 10 ? 0 : 1;
  return inicio + Math.floor(Math.random() * faces);
}

/**
 * Quanto a face vale, que não é sempre o que está gravado nela: o zero do d10
 * vale dez. É a única face do jogo em que gravado e valor divergem.
 */
export function valorDaRolagem(faces: FacesDado, gravado: number): number {
  return faces === 10 && gravado === 0 ? 10 : gravado;
}

/** Escurece a cor da face conforme a luz que ela pega. */
export function corDaFace(hex: string, luz: number): string {
  const n = Number.parseInt(hex.slice(1), 16);
  const canal = (deslocamento: number) =>
    Math.round(((n >> deslocamento) & 255) * luz)
      .toString(16)
      .padStart(2, "0");

  return `#${canal(16)}${canal(8)}${canal(0)}`;
}
