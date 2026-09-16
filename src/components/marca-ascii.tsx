import type { CSSProperties } from "react";

import { ITENS_ASCII, type ItemAscii } from "@/lib/ascii-itens";

/**
 * Um item desenhado em ASCII, de marca-d'água atrás de uma seção.
 *
 * É a mesma família do ASCII da marca e da mesa: texto de verdade, e não
 * imagem, então ele acompanha a largura do contêiner sem pesar no download. A
 * opacidade e a máscara vivem em `.marca-ascii`, no globals.css — aqui só entra
 * onde o desenho fica.
 *
 * Fica fora do fluxo e `aria-hidden`: é textura, não conteúdo.
 */
export function MarcaAscii({
  item,
  className = "",
}: {
  item: ItemAscii;
  className?: string;
}) {
  const { colunas, arte } = ITENS_ASCII[item];

  return (
    <div
      aria-hidden
      className={`marca-ascii pointer-events-none absolute -z-10 ${className}`}
      style={{ "--ascii-colunas": colunas } as CSSProperties}
    >
      <pre>{arte}</pre>
    </div>
  );
}
