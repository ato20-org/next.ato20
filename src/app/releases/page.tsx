import type { Metadata } from "next";

import { ArrowUpRight, Download } from "lucide-react";

import { Cabecalho } from "@/components/cabecalho";
import { NotasDeRelease } from "@/components/notas-de-release";
import { formatarData, formatarTamanho } from "@/lib/formatos";
import { RELEASES_URL } from "@/lib/projeto";
import { RELEASES } from "@/lib/releases";

const DESCRICAO =
  "O que mudou em cada versão do ATO20, e os arquivos de cada release.";

export const metadata: Metadata = {
  title: "Notas de atualização — ATO20",
  description: DESCRICAO,
  openGraph: {
    title: "Notas de atualização — ATO20",
    description: DESCRICAO,
    type: "website",
    locale: "pt_BR",
  },
};

/**
 * O histórico de releases.
 *
 * Os dados vêm congelados de `src/lib/releases.ts`, que `pnpm gerar:releases`
 * escreve a partir da API do GitHub — a página é estática e não consulta nada
 * em tempo de visita.
 */
export default function Releases() {
  return (
    <main className="min-h-dvh">
      <Cabecalho />

      <section className="mx-auto w-full max-w-3xl px-6 pt-12 pb-32 xl:max-w-5xl xl:px-12">
        <p className="font-mono text-sm text-muted-foreground">
          <span className="text-accent">{"//"}</span> o que mudou
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Notas de atualização.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
          Cada versão do ATO20, com o que entrou e os arquivos pra baixar. O
          aplicativo se atualiza sozinho, mas a lista fica aqui pra quem quer ver
          antes.
        </p>

        {RELEASES.length === 0 ? (
          <p className="mt-16 font-mono text-sm text-muted-foreground">
            nenhuma release publicada ainda.
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
                      {formatarData(release.publicadaEm)}
                    </time>
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {/* A mais nova é a que o botão da home entrega. */}
                    {indice === 0 ? (
                      <span className="rounded border border-border bg-muted/50 px-1.5 py-0.5 font-mono text-[0.65rem] tracking-wide uppercase text-foreground">
                        atual
                      </span>
                    ) : null}
                    {release.prerelease ? (
                      <span className="rounded border border-dashed border-border px-1.5 py-0.5 font-mono text-[0.65rem] tracking-wide uppercase">
                        pré-lançamento
                      </span>
                    ) : null}
                  </div>
                </div>

                <div>
                  <NotasDeRelease notas={release.notas} />

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
                              {formatarTamanho(arquivo.bytes)}
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
                    ver esta release no GitHub
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
            todas as releases no GitHub
          </a>
        </p>
      </section>
    </main>
  );
}
