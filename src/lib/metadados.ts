import type { Metadata } from "next";

import { caminho, LOCALE_OG, type Idioma, type Rota } from "@/lib/idioma";

/** O domínio próprio: torna absolutas as URLs de OpenGraph, canônica e hreflang. */
export const BASE = new URL("https://ato20.valbmig.com.br");

/**
 * Os metadados de uma página num idioma, com a canônica e o par de `hreflang`.
 *
 * O `x-default` é o português: é a raiz, e é o idioma em que o site nasceu.
 */
export function metadados(
  idioma: Idioma,
  rota: Rota,
  { titulo, descricao }: { titulo: string; descricao: string },
): Metadata {
  return {
    metadataBase: BASE,
    title: titulo,
    description: descricao,
    alternates: {
      canonical: caminho(idioma, rota),
      languages: {
        "pt-BR": caminho("pt", rota),
        en: caminho("en", rota),
        "x-default": caminho("pt", rota),
      },
    },
    openGraph: {
      title: titulo,
      description: descricao,
      type: "website",
      locale: LOCALE_OG[idioma],
      alternateLocale: LOCALE_OG[idioma === "pt" ? "en" : "pt"],
      url: caminho(idioma, rota),
    },
    twitter: {
      card: "summary_large_image",
      title: titulo,
      description: descricao,
    },
  };
}
