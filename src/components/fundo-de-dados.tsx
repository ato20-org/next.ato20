import type { CSSProperties } from "react";

import { Dado } from "@/components/dado";
import { D6, D10, D12, D20, type Poliedro } from "@/lib/dados-geometria";

/** As variáveis que `.flutua` consome, em `globals.css`. */
type Deriva = {
  duracao: string;
  /** Negativo: começa a animação no meio, pra os dados não derivarem em bloco. */
  atraso: string;
  x: string;
  y: string;
  giro: string;
};

function estiloDaDeriva({ duracao, atraso, x, y, giro }: Deriva) {
  return {
    "--flutuar-duracao": duracao,
    "--flutuar-atraso": atraso,
    "--flutuar-x": x,
    "--flutuar-y": y,
    "--flutuar-giro": giro,
  } as CSSProperties;
}

type Item = {
  poliedro: Poliedro;
  /** Graus de giro entre o centro da tela e a borda, ao seguir o mouse. */
  forca: number;
  posicao: string;
  opacidade: string;
  deriva: Deriva;
};

/* O dado maior deriva devagar e pouco; os pequenos, mais rápido e mais longe —
   é o mesmo truque de profundidade da força do mouse. */
const DADOS: Item[] = [
  {
    poliedro: D20,
    forca: 12,
    // No celular o d20 é maior que a tela e as arestas cruzavam o título.
    // Em xl ele desce pra faixa vazia embaixo: lá em cima ele cruzava o título.
    posicao:
      "-right-28 top-16 hidden w-[34rem] sm:block xl:top-auto xl:-right-20 xl:-bottom-44 xl:w-[30rem]",
    opacidade: "opacity-[0.07]",
    deriva: { duracao: "19s", atraso: "-4s", x: "-8px", y: "16px", giro: "1.5deg" },
  },
  {
    poliedro: D12,
    forca: 14,
    // Em xl desce mais, pra ficar embaixo do ASCII em vez de atravessá-lo.
    posicao:
      "-left-24 -bottom-20 w-[16rem] sm:-left-32 sm:w-[28rem] xl:-left-24 xl:-bottom-36 xl:w-[24rem]",
    opacidade: "opacity-[0.05]",
    deriva: { duracao: "23s", atraso: "-11s", x: "10px", y: "-14px", giro: "-2deg" },
  },
  {
    poliedro: D10,
    forca: 18,
    // Em xl cabe na calha entre a borda da tela e o ASCII, que começa nos 128px.
    posicao: "left-4 top-1/3 hidden w-[9rem] lg:block xl:left-0 xl:top-1/2 xl:w-[8rem]",
    opacidade: "opacity-[0.045]",
    deriva: { duracao: "15s", atraso: "-7s", x: "14px", y: "22px", giro: "3deg" },
  },
  {
    poliedro: D6,
    forca: 16,
    posicao: "right-6 bottom-8 hidden w-[7rem] sm:block xl:hidden",
    opacidade: "opacity-[0.05]",
    deriva: { duracao: "13s", atraso: "-2s", x: "-12px", y: "-18px", giro: "-2.5deg" },
  },
];

/**
 * Dados soltos no fundo do hero. É decoração: ficam nas margens que a coluna de
 * texto não ocupa, em opacidade baixa, e vários sangram pra fora da tela — dado
 * inteiro e centralizado pareceria ilustração, não textura.
 *
 * São dois movimentos somados: a deriva lenta vive no CSS, no contêiner, e o
 * giro que segue o mouse redesenha o traçado do sólido lá dentro.
 */
export function FundoDeDados() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden text-foreground"
      aria-hidden
    >
      {DADOS.map(({ poliedro, forca, posicao, opacidade, deriva }) => (
        <div
          key={posicao}
          className={`flutua absolute ${posicao}`}
          style={estiloDaDeriva(deriva)}
        >
          <Dado poliedro={poliedro} forca={forca} className={`block w-full ${opacidade}`} />
        </div>
      ))}
    </div>
  );
}
