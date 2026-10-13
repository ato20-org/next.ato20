import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { BuscaDePlugins } from "@/components/busca-de-plugins";
import { Cabecalho } from "@/components/cabecalho";
import { normalizar } from "@/lib/busca";
import { noIdioma, PLUGINS, type PluginDoCatalogo } from "@/lib/catalogo";
import { caminho, type Idioma } from "@/lib/idioma";
import { metadados } from "@/lib/metadados";
import { REPO_URL } from "@/lib/projeto";

const pt = {
  titulo: "Plugins · ATO20",
  descricao:
    "Plugins para o ATO20: temas, sistemas de regras e o que mais a mesa pedir. Cada um com o que faz e como se usa.",
  rotulo: "catálogo",
  cabeca: "Plugins.",
  lead:
    "Plugins para a mesa do ATO20. Abra um para ver o que ele faz, as telas e o passo a passo, antes de instalar.",
  nenhum: "nenhum plugin no catálogo ainda.",
  por: "por",
  detalhes: "detalhes",
  comoInstalar: "Como instalar",
  passos: [
    "No ATO20, Configurações → Plugins → Catálogo.",
    "Instalar, no card do plugin. Se ele executa código, o ATO20 pede confirmação antes.",
    "Quando sair versão nova, o mesmo botão vira Atualizar.",
  ],
  aMao:
    "Num ATO20 sem o botão de instalar: baixe o repositório no GitHub (Code → Download ZIP), descompacte e, em Configurações → Plugins → Importar plugin, escolha a pasta que tem o manifest.json.",
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
    "Plugins for ATO20: themes, rules systems and whatever else the table needs. Each one with what it does and how to use it.",
  rotulo: "catalog",
  cabeca: "Plugins.",
  lead:
    "Plugins for the ATO20 table. Open one to see what it does, its screens and a step by step, before you install it.",
  nenhum: "no plugins in the catalog yet.",
  por: "by",
  detalhes: "details",
  comoInstalar: "How to install",
  passos: [
    "In ATO20, Settings → Plugins → Catalog.",
    "Install, on the plugin's card. If it runs code, ATO20 asks you to confirm first.",
    "When a new version is out, the same button turns into Update.",
  ],
  aMao:
    "On an ATO20 without the install button: download the repository on GitHub (Code → Download ZIP), unzip it and, in Settings → Plugins → Import plugin, pick the folder with manifest.json inside.",
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
export function matiz(id: string): number {
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
export function Capa({ plugin }: { plugin: PluginDoCatalogo }) {
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

export function Icone({
  plugin,
  nome,
  grande = false,
}: {
  plugin: PluginDoCatalogo;
  nome: string;
  grande?: boolean;
}) {
  const lado = grande ? 72 : 48;
  const tamanho = grande ? "size-18 rounded-2xl text-3xl" : "size-12 rounded-lg text-lg";

  if (plugin.icone) {
    return (
      <Image
        src={plugin.icone}
        alt=""
        width={lado}
        height={lado}
        unoptimized={plugin.icone.endsWith(".svg")}
        className={`${tamanho} shrink-0`}
      />
    );
  }

  const h = matiz(plugin.id);

  return (
    <span
      aria-hidden
      className={`${tamanho} grid shrink-0 place-items-center font-mono font-medium`}
      style={{ backgroundColor: `oklch(0.3 0.05 ${h})`, color: `oklch(0.88 0.08 ${h})` }}
    >
      {Array.from(nome)[0]?.toUpperCase()}
    </span>
  );
}

/**
 * O card de um plugin: o que a busca mostra ou esconde. O card inteiro é o
 * link da página dele, com o README; o GitHub e a versão da API ficam lá.
 */
function CardDoPlugin({ plugin, idioma }: { plugin: PluginDoCatalogo; idioma: Idioma }) {
  const t = TEXTO[idioma];
  const nome = noIdioma(plugin.nome, idioma);

  return (
    <Link href={caminho(idioma, `/plugins/${plugin.id}`)} className="group flex flex-1 flex-col">
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

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
          <ul className="flex min-w-0 flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground/80">
            {plugin.tags.map((tag) => (
              <li key={tag}>#{tag}</li>
            ))}
          </ul>

          <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors group-hover:text-foreground">
            {t.detalhes}
            <ArrowRight
              className="size-3.5 transition-transform group-hover:translate-x-0.5"
              strokeWidth={1.75}
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

/** Tudo em que a busca procura, no idioma da página. */
function textoDeBusca(plugin: PluginDoCatalogo, idioma: Idioma): string {
  return normalizar(
    [
      plugin.id,
      noIdioma(plugin.nome, idioma),
      noIdioma(plugin.descricao, idioma),
      plugin.autor,
      ...plugin.tags,
    ].join(" "),
  );
}

/**
 * A vitrine de plugins.
 *
 * Os dados vêm de `public/plugins.json`, lido e validado no build por
 * `src/lib/catalogo.ts`: a página é estática, como a de releases. Cada card
 * leva à página do plugin (`PaginaDoPlugin`), com o README do repositório.
 *
 * Sem selo de "executa código" no card: quem escolhe um plugin quer saber o
 * que ele faz. A confiança fica no aviso do "como instalar", e o aplicativo
 * pergunta na hora de instalar um plugin que traz código.
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
          <BuscaDePlugins
            idioma={idioma}
            itens={PLUGINS.map((plugin) => ({
              id: plugin.id,
              busca: textoDeBusca(plugin, idioma),
              card: <CardDoPlugin plugin={plugin} idioma={idioma} />,
            }))}
          />
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
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground text-pretty">{t.aMao}</p>
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
