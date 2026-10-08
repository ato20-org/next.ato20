/**
 * Sem acento e em minúsculas: "Névoa" acha "nevoa".
 *
 * Fora do componente de cliente porque o servidor também chama: é com ela que a
 * página monta o texto de busca de cada plugin, e a busca normaliza o que se
 * digita do mesmo jeito.
 */
export function normalizar(texto: string): string {
  return texto.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}
