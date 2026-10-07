import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { Cabecalho } from "@/components/cabecalho";
import { noIdioma, PLUGINS, type PluginDoCatalogo } from "@/lib/catalogo";
import type { Idioma } from "@/lib/idioma";
import { metadados } from "@/lib/metadados";
import { REPO_URL } from "@/lib/projeto";

const pt = {
  titulo: "Plugins · ATO20",
  descricao:
    "Plugins para o ATO20: temas, sistemas de regras e o que mais a mesa pedir. Cada um com o que faz e se executa código.",
  rotulo: "catálogo",
  cabeca: "Plugins.",
  lead:
    "Plugins para a mesa do ATO20. Cada card diz o que o plugin faz e se ele executa código, antes de você baixar qualquer coisa.",
  nenhum: "nenhum plugin no catálogo ainda.",
  por: "por",
  semCodigo: "sem código",
  semCodigoNota: "Só tema e o que o manifesto declara. Nenhum JavaScript roda.",
  executaCodigo: "executa código",
  executaCodigoNota: "Traz JavaScript, que roda com o alcance da janela do Mestre.",
  api: "api",
  verNoGithub: "ver no GitHub",
  comoInstalar: "Como instalar",
  passos: [
    "Baixe o repositório do plugin: no GitHub, Code → Download ZIP.",
    "Descompacte. A pasta certa é a que tem o manifest.json dentro.",
    "No ATO20, Configurações → Plugins → Importar plugin, e escolha essa pasta.",
  ],
  aviso:
    "plugin que executa código roda com o alcance da janela do Mestre: instale de quem você confia, como num editor de código.",
  fezUm: "Fez um plugin?",
  abraIssue: "Abra uma issue com o link do repositório",
  entraNaLista: "e ele entra na lista. O que um plugin pode fazer está na",
  documentacao: "documentação da API",
  tituloDaIssue: "Plugin para o catálogo: ",
};

const en: typeof pt = {
  titulo: "Plugins · ATO20",
  descricao:
    "Plugins for ATO20: themes, rules systems and whatever else the table needs. Each one with what it does and whether it runs code.",
  rotulo: "catalog",
  cabeca: "Plugins.",
  lead:
    "Plugins for the ATO20 table. Each card says what the plugin does and whether it runs code, before you download anything.",
  nenhum: "no plugins in the catalog yet.",
  por: "by",
  semCodigo: "no code",
  semCodigoNota: "Only a theme and what the manifest declares. No JavaScript runs.",
  executaCodigo: "runs code",
  executaCodigoNota: "Ships JavaScript, which runs with the same access as the GM window.",
  api: "api",
  verNoGithub: "see on GitHub",
  comoInstalar: "How to install",
  passos: [
    "Download the plugin's repository: on GitHub, Code → Download ZIP.",
    "Unzip it. The right folder is the one with manifest.json inside.",
    "In ATO20, Settings → Plugins → Import plugin, and pick that folder.",
  ],
  aviso:
    "plugins that run code have the same access as the GM window: install them from people you trust, like in a code editor.",
  fezUm: "Made a plugin?",
  abraIssue: "Open an issue with the repository link",
  entraNaLista: "and it goes on the list. What a plugin can do is in the",
  documentacao: "API documentation",
  tituloDaIssue: "Plugin for the catalog: ",
};

const TEXTO = { pt, en };

export function metadadosDePlugins(idioma: Idioma) {
  return metadados(idioma, "/plugins", {
    titulo: TEXTO[idioma].titulo,
    descricao: TEXTO[idioma].descricao,
  });
}

/**
 * Um matiz estável por plugin. Sem ícone, a inicial é o que distingue um card
 * do outro, e "Ordem" e "OBS" começam com a mesma letra: a cor é que separa.
 */
function matiz(id: string): number {
  let soma = 0;
  for (const letra of id) soma = (soma * 31 + letra.charCodeAt(0)) % 360;

  return soma;
}

/**
 * A capa, ou, sem ela, a grade do fundo da home com o nome da pasta do plugin
 * no meio. A pasta e não o nome por extenso, que já está logo embaixo: é o
 * mesmo `iniciativa/` da seção de plugins da home, a promessa de que um plugin
 * é uma pasta.
 */
function Capa({ plugin }: { plugin: PluginDoCatalogo }) {
  if (plugin.capa) {
    return (
      <div className="relative aspect-video border-b border-border">
        <Image
          src={plugin.capa}
          alt=""
          fill
          sizes="(min-width: 1280px) 24rem, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  const h = matiz(plugin.id);

  return (
    <div
      className="relative grid aspect-video place-items-center overflow-hidden border-b border-border"
      style={{ backgroundColor: `oklch(0.19 0.025 ${h})` }}
    >
      <div className="grade absolute inset-0" aria-hidden />
      <span
        className="relative px-6 text-center font-mono text-sm break-all"
        style={{ color: `oklch(0.72 0.07 ${h})` }}
      >
        {plugin.id}/
      </span>
    </div>
  );
}

function Icone({ plugin, nome }: { plugin: PluginDoCatalogo; nome: string }) {
  if (plugin.icone) {
    return (
      <Image
        src={plugin.icone}
        alt=""
        width={48}
        height={48}
        unoptimized={plugin.icone.endsWith(".svg")}
        className="size-12 shrink-0 rounded-lg"
      />
    );
  }

  const h = matiz(plugin.id);

  return (
    <span
      aria-hidden
      className="grid size-12 shrink-0 place-items-center rounded-lg font-mono text-lg font-medium"
      style={{ backgroundColor: `oklch(0.3 0.05 ${h})`, color: `oklch(0.88 0.08 ${h})` }}
    >
      {Array.from(nome)[0]?.toUpperCase()}
    </span>
  );
}

/**
 * A vitrine de plugins.
 *
 * Os dados vêm de `public/plugins.json`, lido e validado no build por
 * `src/lib/catalogo.ts`: a página é estática, como a de releases.
 *
 * O selo de código é a primeira coisa do rodapé de cada card. A guarda do
 * aplicativo é contra plugin malformado, não contra plugin malicioso, e uma
 * vitrine dentro do site do projeto parece aval: o selo é o que diz, card a
 * card, quanto se está confiando ao instalar.
 */
export function PaginaDePlugins({ idioma }: { idioma: Idioma }) {
  const t = TEXTO[idioma];
  const novaIssue = `${REPO_URL}/issues/new?title=${encodeURIComponent(t.tituloDaIssue)}`;

  return (
    <main className="min-h-dvh">
      <Cabecalho idioma={idioma} rota="/plugins" />

      <section className="mx-auto w-full max-w-3xl px-6 pt-12 pb-32 xl:max-w-7xl xl:px-12">
        <p className="font-mono text-sm text-muted-foreground">
          <span className="text-accent">{"//"}</span> {t.rotulo}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {t.cabeca}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
          {t.lead}
        </p>

        {PLUGINS.length === 0 ? (
          <p className="mt-16 font-mono text-sm text-muted-foreground">{t.nenhum}</p>
        ) : (
          <ul className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {PLUGINS.map((plugin) => {
              const nome = noIdioma(plugin.nome, idioma);

              return (
                <li
                  key={plugin.id}
                  className="flex flex-col overflow-hidden rounded-xl border border-border bg-muted/20"
                >
                  <Capa plugin={plugin} />

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-3">
                      <Icone plugin={plugin} nome={nome} />
                      <div className="min-w-0">
                        <h2 className="font-medium tracking-tight text-balance">{nome}</h2>
                        <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                          {t.por} {plugin.autor}
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground text-pretty">
                      {noIdioma(plugin.descricao, idioma)}
                    </p>

                    {plugin.tags.length > 0 ? (
                      <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground/80">
                        {plugin.tags.map((tag) => (
                          <li key={tag}>#{tag}</li>
                        ))}
                      </ul>
                    ) : null}

                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                      <div className="flex flex-wrap gap-1.5">
                        {plugin.executaCodigo ? (
                          <span
                            title={t.executaCodigoNota}
                            className="rounded border border-accent/40 px-1.5 py-0.5 font-mono text-[0.65rem] tracking-wide text-accent uppercase"
                          >
                            {t.executaCodigo}
                          </span>
                        ) : (
                          <span
                            title={t.semCodigoNota}
                            className="rounded border border-border bg-muted/50 px-1.5 py-0.5 font-mono text-[0.65rem] tracking-wide text-foreground uppercase"
                          >
                            {t.semCodigo}
                          </span>
                        )}
                        <span className="rounded border border-dashed border-border px-1.5 py-0.5 font-mono text-[0.65rem] tracking-wide text-muted-foreground uppercase">
                          {t.api} {plugin.apiVersao}
                        </span>
                      </div>

                      <a
                        href={plugin.repositorio}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex shrink-0 items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {t.verNoGithub}
                        <ArrowUpRight className="size-3.5" strokeWidth={1.75} />
                      </a>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-20 grid gap-12 border-t border-border pt-10 xl:grid-cols-2 xl:gap-16">
          <div>
            <h2 className="font-mono text-xs tracking-widest text-foreground uppercase">
              {t.comoInstalar}
            </h2>
            <ol className="mt-4 space-y-3">
              {t.passos.map((passo, indice) => (
                <li key={passo} className="flex gap-3 leading-relaxed text-muted-foreground">
                  <span className="font-mono text-sm text-accent">{indice + 1}.</span>
                  <span className="text-pretty">{passo}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 font-mono text-xs leading-relaxed text-muted-foreground">
              <span className="text-accent">{"//"}</span> {t.aviso}
            </p>
          </div>

          <p className="leading-relaxed text-muted-foreground text-pretty xl:pt-8">
            <span className="text-foreground">{t.fezUm}</span>{" "}
            <a
              href={novaIssue}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
            >
              {t.abraIssue}
            </a>{" "}
            {t.entraNaLista}{" "}
            <a
              href={`${REPO_URL}/blob/main/docs/extensoes.md`}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
            >
              {t.documentacao}
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
