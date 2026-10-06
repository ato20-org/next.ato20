import { FundoDeDados } from "@/components/fundo-de-dados";
import { Saquinho } from "@/components/saquinho";
import { geistMono, geistSans } from "@/lib/fontes";
import { LANG, type Idioma } from "@/lib/idioma";

import "@/app/globals.css";

/**
 * O `<html>` do site, igual nos dois idiomas a não ser pelo `lang`.
 *
 * Cada idioma tem o seu root layout -- é o que deixa o `lang` certo no HTML
 * estático, sem script trocando depois --, e os dois entregam o corpo aqui.
 */
export function Raiz({
  idioma,
  children,
}: {
  idioma: Idioma;
  children: React.ReactNode;
}) {
  return (
    <html lang={LANG[idioma]} className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {/* Fora do `children`: o fundo é do site, e acompanha a rolagem de
            qualquer página. */}
        <FundoDeDados />
        {children}
        {/* Fora do `children`: o saquinho é do site, não de uma página. */}
        <Saquinho idioma={idioma} />
      </body>
    </html>
  );
}
