/**
 * O tamanho de um arquivo de release, como as pessoas leem.
 *
 * Base 1024, uma casa decimal e vírgula: o instalador do Windows tem 10 MB e o
 * AppImage do Linux tem 98 MB, e a diferença entre os dois é justamente o que a
 * pessoa quer saber antes de clicar.
 */
export function formatarTamanho(bytes: number): string {
  const mega = bytes / 1024 ** 2;

  if (mega < 1) return `${Math.round(bytes / 1024)} KB`;

  return `${mega.toFixed(1).replace(".", ",")} MB`;
}

/**
 * A data de publicação de uma release, por extenso.
 *
 * O fuso é fixo em São Paulo, e não o de quem abre a página: assim a data sai
 * igual no HTML gerado no build e em qualquer navegador, sem divergir na
 * hidratação.
 */
export function formatarData(iso: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(iso));
}
