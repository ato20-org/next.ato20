import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Cabecalho } from "@/components/cabecalho";
import { Icone } from "@/components/pagina-de-plugins";
import { Readme } from "@/components/readme";
import { noIdioma, PLUGINS } from "@/lib/catalogo";
import { caminho, type Idioma } from "@/lib/idioma";
import { metadados } from "@/lib/metadados";
import { lerReadme } from "@/lib/readme";

const pt = {
  titulo: (nome: string) => `${nome} · Plugins · ATO20`,
  voltar: "plugins",
  por: "por",
  api: (api: number) => `pede a API ${api}`,
  verNoGithub: "ver no GitHub",
  instalar: "No ATO20: Configurações → Plugins → Catálogo → Instalar.",
  semReadme: "Este plugin ainda não tem README. O que ele faz está no repositório.",
};

const en: typeof pt = {
  titulo: (nome) => `${nome} · Plugins · ATO20`,
  voltar: "plugins",
  por: "by",
  api: (api) => `needs API ${api}`,
  verNoGithub: "see on GitHub",
  instalar: "In ATO20: Settings → Plugins → Catalog → Install.",
  semReadme: "This plugin has no README yet. What it does is in the repository.",
};

const TEXTO = { pt, en };

function acharPlugin(id: string) {
  const plugin = PLUGINS.find((cada) => cada.id === id);
  if (!plugin) notFound();

  return plugin;
}

/** Uma página por plugin do catálogo, nos dois idiomas. */
export function paramsDosPlugins() {
  return PLUGINS.map((plugin) => ({ id: plugin.id }));
}

export function metadadosDoPlugin(idioma: Idioma, id: string) {
  const plugin = acharPlugin(id);

  return metadados(idioma, `/plugins/${plugin.id}`, {
    titulo: TEXTO[idioma].titulo(noIdioma(plugin.nome, idioma)),
    descricao: noIdioma(plugin.descricao, idioma),
  });
}

/**
 * A página de um plugin, como a de uma extensão no VS Code: o ícone, quem fez
 * e como instalar em cima, e embaixo o README do repositório, que é onde o
 * autor mostra o plugin funcionando. A mesma janela de detalhes do catálogo no
 * aplicativo.
 *
 * O README é lido no build e a cada hora (`revalidate` na rota), ver
 * `lerReadme`. Coluna estreita, de leitura: é um texto, não uma vitrine.
 */
export async function PaginaDoPlugin({ idioma, id }: { idioma: Idioma; id: string }) {
  const t = TEXTO[idioma];
  const plugin = acharPlugin(id);
  const nome = noIdioma(plugin.nome, idioma);
  const readme = await lerReadme(plugin.repositorio, idioma);

  return (
    <main className="min-h-dvh">
      <Cabecalho idioma={idioma} rota={`/plugins/${plugin.id}`} />

      <section className="mx-auto w-full max-w-3xl px-6 pt-12 pb-32">
        <Link
          href={caminho(idioma, "/plugins")}
          className="inline-flex items-center gap-1.5 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" strokeWidth={1.75} aria-hidden />
          {t.voltar}
        </Link>

        <div className="mt-8 flex items-center gap-5">
          <Icone plugin={plugin} nome={nome} grande />
          <div className="min-w-0">
            <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {nome}
            </h1>
            <p className="mt-1.5 font-mono text-xs text-muted-foreground">
              {t.por} {plugin.autor} · {t.api(plugin.apiVersao)}
            </p>
          </div>
        </div>

        <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
          {noIdioma(plugin.descricao, idioma)}
        </p>

        {plugin.tags.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground/80">
            {plugin.tags.map((tag) => (
              <li key={tag}>#{tag}</li>
            ))}
          </ul>
        ) : null}

        <div className="mt-8 flex flex-col gap-4 rounded-xl border border-border bg-muted/20 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs leading-relaxed text-muted-foreground">
            <span className="text-accent">{"//"}</span> {t.instalar}
          </p>
          <a
            href={plugin.repositorio}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg border border-border px-3 py-2 font-mono text-xs text-foreground transition-colors hover:border-muted-foreground sm:self-auto"
          >
            {t.verNoGithub}
            <ArrowUpRight className="size-3.5" strokeWidth={1.75} aria-hidden />
          </a>
        </div>

        <article className="mt-14">
          {readme === null ? (
            <p className="font-mono text-sm text-muted-foreground">{t.semReadme}</p>
          ) : (
            <Readme texto={readme} repositorio={plugin.repositorio} />
          )}
        </article>
      </section>
    </main>
  );
}
