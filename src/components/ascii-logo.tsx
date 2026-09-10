"use client";

import { useEffect, useMemo, useRef } from "react";

import { COLUNAS, LINHAS, MASCARA } from "@/lib/ascii-logo";
import { inscrever, seguirPonteiroPermitido } from "@/lib/dados-interacao";

/** Caractere do desenho em repouso: presente, mas discreto. */
const REPOUSO = "·";

/** Rampa do foco, do mais denso no centro ao mais leve na borda. */
const RAMPA = ["@", "@", "#", "%", "*", "+", "=", ":", "."];

/** Raio do foco, em células. Com pouco raio o efeito some num desenho de 129 colunas. */
const RAIO = 32;

/** Preenche até COLUNAS: o gerador corta o espaço da direita. */
const completar = (linha: string) => linha.padEnd(COLUNAS, " ");

export function AsciiLogo({ className }: { className?: string }) {
  const caixa = useRef<HTMLDivElement>(null);
  const foco = useRef<HTMLPreElement>(null);

  const repouso = useMemo(
    () =>
      MASCARA.map((linha) =>
        completar(linha).replace(/@/g, REPOUSO),
      ).join("\n"),
    [],
  );

  useEffect(() => {
    const elementoFoco = foco.current;
    const elementoCaixa = caixa.current;
    if (!elementoFoco || !elementoCaixa) return;

    const apagar = () => {
      if (elementoFoco.textContent !== "") elementoFoco.textContent = "";
    };

    // O ponteiro saindo da janela deixaria o foco aceso onde ele estava. Isso
    // não passa pelo laço, que a essa altura já parou.
    document.addEventListener("pointerleave", apagar);

    const soltar = seguirPonteiroPermitido()
      ? inscrever(({ clienteX, clienteY }) => {
          const area = elementoCaixa.getBoundingClientRect();
          const larguraDaCelula = area.width / COLUNAS;
          const alturaDaCelula = area.height / LINHAS;

          const colunaDoMouse = (clienteX - area.left) / larguraDaCelula;
          const linhaDoMouse = (clienteY - area.top) / alturaDaCelula;

          const desenho: string[] = [];
          for (let linha = 0; linha < LINHAS; linha += 1) {
            // A célula é mais alta que larga; sem corrigir isso o foco sai
            // ovalado em vez de redondo.
            const distanciaY =
              ((linha + 0.5 - linhaDoMouse) * alturaDaCelula) / larguraDaCelula;

            if (Math.abs(distanciaY) > RAIO) {
              desenho.push("");
              continue;
            }

            const original = completar(MASCARA[linha]);
            let saida = "";
            for (let coluna = 0; coluna < COLUNAS; coluna += 1) {
              // O foco só acende o que já é desenho; fora da marca não há o que
              // iluminar.
              if (original[coluna] !== "@") {
                saida += " ";
                continue;
              }

              const distanciaX = coluna + 0.5 - colunaDoMouse;
              const distancia = Math.hypot(distanciaX, distanciaY);
              if (distancia > RAIO) {
                saida += " ";
                continue;
              }

              const passo = Math.min(
                RAMPA.length - 1,
                Math.floor((distancia / RAIO) * RAMPA.length),
              );
              saida += RAMPA[passo];
            }
            desenho.push(saida.replace(/\s+$/, ""));
          }

          const texto = desenho.join("\n");
          if (texto === elementoFoco.textContent) return false;
          // Uma escrita no DOM por quadro, não uma por célula.
          elementoFoco.textContent = texto;
          return true;
        })
      : undefined;

    return () => {
      document.removeEventListener("pointerleave", apagar);
      soltar?.();
    };
  }, []);

  return (
    <div
      ref={caixa}
      // `container-type` faz o corpo do texto sair da largura da coluna: são
      // 129 colunas de ~0.6em, então 1em = 100cqi / 77.4.
      className={`ascii pointer-events-none relative text-foreground select-none ${className ?? ""}`}
      aria-hidden
    >
      <pre>{repouso}</pre>
      <pre ref={foco} className="absolute inset-0" />
    </div>
  );
}
