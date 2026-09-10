"use client";

import { useEffect, useMemo, useRef } from "react";

import type { Poliedro } from "@/lib/dados-geometria";
import { inscrever, seguirPonteiroPermitido } from "@/lib/dados-interacao";
import { caminhoDoPoliedro } from "@/lib/projecao";

type Props = {
  poliedro: Poliedro;
  /** Graus de giro entre o centro da tela e a borda. Mais = mais reativo. */
  forca?: number;
  className?: string;
};

/** Quanto do caminho até o alvo é vencido por quadro. */
const SUAVIZACAO = 0.12;

/** Abaixo disso o olho não vê diferença e o laço pode parar. */
const PARADO = 0.05;

export function Dado({ poliedro, forca = 14, className }: Props) {
  const traco = useRef<SVGPathElement>(null);

  // A pose de repouso é determinística, então o servidor e a primeira
  // renderização do cliente desenham o mesmo traçado. O ponteiro só entra
  // depois da hidratação.
  const repouso = useMemo(
    () => caminhoDoPoliedro(poliedro, poliedro.base[0], poliedro.base[1]),
    [poliedro],
  );

  useEffect(() => {
    if (!seguirPonteiroPermitido()) return;

    const [baseX, baseY] = poliedro.base;
    let atualX = baseX;
    let atualY = baseY;

    return inscrever(({ x: ponteiroX, y: ponteiroY }) => {
      // Ponteiro à direita gira o dado pra direita; embaixo, inclina pra frente.
      const alvoX = baseX - ponteiroY * forca;
      const alvoY = baseY + ponteiroX * forca;

      const restaX = alvoX - atualX;
      const restaY = alvoY - atualY;
      if (Math.abs(restaX) < PARADO && Math.abs(restaY) < PARADO) return false;

      atualX += restaX * SUAVIZACAO;
      atualY += restaY * SUAVIZACAO;

      // Escreve direto no atributo: passar por estado do React re-renderizaria
      // todos os dados a 60 quadros por segundo sem nenhum ganho.
      traco.current?.setAttribute("d", caminhoDoPoliedro(poliedro, atualX, atualY));
      return true;
    });
  }, [poliedro, forca]);

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinejoin="round"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      {/* O traço não engorda junto com o dado: eles aparecem em tamanhos bem
          diferentes e todos têm que ficar em fio de cabelo. */}
      <path ref={traco} d={repouso} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
