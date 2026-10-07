/**
 * Os dois idiomas do site, e onde mora cada um.
 *
 * Português na raiz, inglês em `/en`. A raiz não muda de endereço: os links
 * que já circulam continuam caindo no mesmo lugar, e ninguém é redirecionado
 * pelo idioma do navegador -- quem quer o outro idioma troca no cabeçalho, e o
 * Google acha cada um pelo `hreflang`.
 *
 * O texto mora ao lado de cada componente, num objeto `{ pt, en }` tipado pelo
 * português: é uma página de vitrine, e o texto lido junto do desenho que ele
 * ocupa é o que deixa ajustar um sem quebrar o outro.
 */
export const IDIOMAS = ["pt", "en"] as const;

export type Idioma = (typeof IDIOMAS)[number];

/** As rotas do site, sem o prefixo do idioma. */
export type Rota = "/" | "/plugins" | "/releases";

const PREFIXO: Record<Idioma, string> = { pt: "", en: "/en" };

/** O endereço de uma rota num idioma: `/releases` em inglês é `/en/releases`. */
export function caminho(idioma: Idioma, rota: Rota): string {
  const prefixo = PREFIXO[idioma];

  return rota === "/" ? prefixo || "/" : `${prefixo}${rota}`;
}

/** O `lang` do `<html>`. */
export const LANG: Record<Idioma, string> = { pt: "pt-BR", en: "en" };

/** O `og:locale`. */
export const LOCALE_OG: Record<Idioma, string> = { pt: "pt_BR", en: "en_US" };

/** O nome de cada idioma escrito nele mesmo, para o botão de troca. */
export const NOME_CURTO: Record<Idioma, string> = { pt: "PT", en: "EN" };
