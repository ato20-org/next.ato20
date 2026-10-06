import { ArrowUpRight, Download } from "lucide-react";

import { Cabecalho } from "@/components/cabecalho";
import { NotasDeRelease } from "@/components/notas-de-release";
import { formatarData, formatarTamanho } from "@/lib/formatos";
import type { Idioma } from "@/lib/idioma";
import { metadados } from "@/lib/metadados";
import { RELEASES_URL } from "@/lib/projeto";
import { RELEASES } from "@/lib/releases";

const pt = {
  titulo: "Notas de atualização · ATO20",
  descricao: "O que mudou em cada versão do ATO20, e os arquivos de cada release.",
  rotulo: "o que mudou",
  cabeca: "Notas de atualização.",
  lead:
    "Cada versão do ATO20, com o que entrou e os arquivos pra baixar. O aplicativo se atualiza sozinho, mas a lista fica aqui pra quem quer ver antes.",
  nenhuma: "nenhuma release publicada ainda.",
  atual: "atual",
  preLancamento: "pré-lançamento",
  verNoGithub: "ver esta release no GitHub",
  todasNoGithub: "todas as releases no GitHub",
};

const en: typeof pt = {
  titulo: "Release notes · ATO20",
  descricao: "What changed in each ATO20 version, and the files of each release.",
  rotulo: "what changed",
  cabeca: "Release notes.",
  lead:
    "Every ATO20 version, with what came in and the files to download. The app updates itself, but the list lives here for anyone who wants to look first.",
  nenhuma: "no releases published yet.",
  atual: "latest",
  preLancamento: "pre-release",
  verNoGithub: "see this release on GitHub",
  todasNoGithub: "all releases on GitHub",
};

const TEXTO = { pt, en };

export function metadadosDeReleases(idioma: Idioma) {
  return metadados(idioma, "/releases", {
    titulo: TEXTO[idioma].titulo,
    descricao: TEXTO[idioma].descricao,
  });
}

/**
 * O histórico de releases.
 *
 * Os dados vêm congelados de `src/lib/releases.ts`, que `pnpm gerar:releases`
 * escreve a partir da API do GitHub — a página é estática e não consulta nada
 * em tempo de visita.
 */
export function PaginaDeReleases({ idioma }: { idioma: Idioma }) {
  const t = TEXTO[idioma];

  return (
    <main className="min-h-dvh">
      <Cabecalho idioma={idioma} rota="/releases" />

      <section className="mx-auto w-full max-w-3xl px-6 pt-12 pb-32 xl:max-w-5xl xl:px-12">
        <p className="font-mono text-sm text-muted-foreground">
          <span className="text-accent">{"//"}</span> {t.rotulo}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {t.cabeca}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
          {t.lead}
        </p>

        {RELEASES.length === 0 ? (
          <p className="mt-16 font-mono text-sm text-muted-foreground">
            {t.nenhuma}
          </p>
        ) : (
          <div className="mt-20 space-y-16">
            {RELEASES.map((release, indice) => (
              <article
                key={release.tag}
                className="grid gap-8 border-t border-border pt-10 xl:grid-cols-[14rem_minmax(0,1fr)] xl:gap-12"
              >
                <div className="xl:sticky xl:top-10 xl:self-start">
                  <h2 className="font-mono text-lg font-medium tracking-tight text-accent">
                    {release.tag}
                  </h2>
                  <p className="mt-2 font-mono text-xs text-muted-foreground">
                    <time dateTime={release.publicadaEm}>
                      {formatarData(release.publicadaEm, idioma)}
                    </time>
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {/* A mais nova é a que o botão da home entrega. */}
                    {indice === 0 ? (
                      <span className="rounded border border-border bg-muted/50 px-1.5 py-0.5 font-mono text-[0.65rem] tracking-wide uppercase text-foreground">
                        {t.atual}
                      </span>
                    ) : null}
                    {release.prerelease ? (
                      <span className="rounded border border-dashed border-border px-1.5 py-0.5 font-mono text-[0.65rem] tracking-wide uppercase">
                        {t.preLancamento}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div>
                  <NotasDeRelease release={release} idioma={idioma} />

                  {release.arquivos.length > 0 ? (
                    <ul className="mt-8 grid gap-px overflow-hidden rounded-xl bg-border sm:grid-cols-2">
                      {release.arquivos.map((arquivo) => (
                        <li key={arquivo.nome} className="bg-background">
                          <a
                            href={arquivo.url}
                            download
                            className="flex h-full items-center gap-3 p-4 transition-colors hover:bg-muted/40"
                          >
                            <Download
                              className="size-3.5 shrink-0 text-muted-foreground"
                              strokeWidth={1.75}
                            />
                            <span className="min-w-0 flex-1 truncate font-mono text-xs">
                              {arquivo.nome}
                            </span>
                            <span className="shrink-0 font-mono text-xs text-muted-foreground">
                              {formatarTamanho(arquivo.bytes, idioma)}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <a
                    href={release.pagina}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t.verNoGithub}
                    <ArrowUpRight className="size-3.5" strokeWidth={1.75} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        <p className="mt-20 border-t border-border pt-8 font-mono text-xs text-muted-foreground">
          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
          >
            {t.todasNoGithub}
          </a>
        </p>
      </section>
    </main>
  );
}
