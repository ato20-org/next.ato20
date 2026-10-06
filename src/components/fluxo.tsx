import { type ComponentType } from "react";

import { ArrowRight, Folder, IdCard } from "lucide-react";

import { Dado } from "@/components/dado";
import { MarcaAscii } from "@/components/marca-ascii";
import { D20 } from "@/lib/dados-geometria";
import type { Idioma } from "@/lib/idioma";

/**
 * A estrutura que o aplicativo cria de verdade, em `vault/mod.rs`. Os nomes são
 * os do disco, e por isso não mudam com o idioma: só o comentário de cada um.
 */
const ARVORE = [
  { ramo: "├──", nome: "config.json" },
  { ramo: "├──", nome: "cenas/" },
  { ramo: "├──", nome: "assets/" },
  { ramo: "└──", nome: ".ato20/" },
] as const;

type NomeNaArvore = (typeof ARVORE)[number]["nome"];

type Etapa = {
  verbo: string;
  titulo: string;
  linha: string;
  /** Os nomes que essa etapa tem dentro do aplicativo. */
  marcas: string[];
};

/** O ícone de cada etapa, na ordem das `etapas`. */
const ICONES: ComponentType<React.SVGProps<SVGSVGElement>>[] = [
  Folder,
  IdCard,
  // O d20 de traço é o mesmo do fundo do site: o ícone da última etapa é a
  // marca do projeto, e não um símbolo genérico de "jogar". Vem mais apagado
  // porque tem muito mais linha que uma pasta ou um crachá — no mesmo tom,
  // puxaria o olho pra terceira etapa sem motivo.
  (props) => <Dado poliedro={D20} forca={22} {...props} />,
];

const pt = {
  rotulo: "do projeto à mesa",
  titulo: (
    <>
      Do seu arquivo
      <br />à próxima sessão.
    </>
  ),
  lead: "Organize a campanha, monte os personagens e abra a mesa. Tudo no mesmo lugar.",
  raiz: "~/campanhas/campanha-do-sol",
  arvore: {
    "config.json": "nome e código da mesa",
    "cenas/": "o que entra no ar",
    "assets/": "mapas, retratos, sons",
    ".ato20/": "o estado da sessão",
  } satisfies Record<NomeNaArvore, string>,
  etapas: [
    {
      verbo: "preparar",
      titulo: "Sua campanha.",
      linha: "Uma pasta no seu disco, não uma linha no banco de dados de alguém.",
      marcas: ["cenas", "mapas", "sons"],
    },
    {
      verbo: "organizar",
      titulo: "Seus personagens.",
      linha: "Cada um com o que precisa na hora de entrar em cena.",
      marcas: ["fichas", "retratos", "inventário"],
    },
    {
      verbo: "mestrar",
      titulo: "A mesa.",
      linha: "Abra a sessão e passe o código: a mesa inteira entra.",
      marcas: ["código", "espectador", "celulares"],
    },
  ] satisfies [Etapa, Etapa, Etapa],
};

const en: typeof pt = {
  rotulo: "from project to table",
  titulo: (
    <>
      From your files
      <br />to the next session.
    </>
  ),
  lead: "Organize the campaign, build the characters and open the table. All in the same place.",
  raiz: "~/campaigns/sun-campaign",
  arvore: {
    "config.json": "table name and code",
    "cenas/": "what goes on air",
    "assets/": "maps, portraits, sounds",
    ".ato20/": "the session state",
  },
  etapas: [
    {
      verbo: "prepare",
      titulo: "Your campaign.",
      linha: "A folder on your disk, not a row in someone else's database.",
      marcas: ["scenes", "maps", "sounds"],
    },
    {
      verbo: "organize",
      titulo: "Your characters.",
      linha: "Each one with what they need when it's time to step into the scene.",
      marcas: ["sheets", "portraits", "inventory"],
    },
    {
      verbo: "run",
      titulo: "The table.",
      linha: "Open the session and share the code: the whole table joins.",
      marcas: ["code", "spectator", "phones"],
    },
  ],
};

const TEXTO = { pt, en };

/**
 * O caminho que a campanha faz: pasta no disco, aplicativo, mesa.
 *
 * A árvore é a estrutura de verdade que o aplicativo escreve, e não um desenho
 * ilustrativo: a promessa da seção é justamente que não existe banco escondido
 * nem nuvem no meio, e inventar nome de pasta aqui derrubaria a única coisa que
 * ela tem pra dizer.
 *
 * Aqui não entra captura de tela de propósito. As telas são o assunto da seção
 * seguinte, e repetí-las nas duas transformaria a página numa galeria.
 */
export function Fluxo({ idioma }: { idioma: Idioma }) {
  const t = TEXTO[idioma];

  return (
    <section className="relative isolate mx-auto w-full max-w-3xl overflow-hidden px-6 py-16 sm:py-20 xl:max-w-7xl xl:px-12">
      <MarcaAscii item="axe" className="-right-16 bottom-0 hidden w-[34rem] lg:block" />

      <div className="grid gap-10 xl:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] xl:items-center xl:gap-20">
        <div className="surgir">
          <p className="font-mono text-sm text-muted-foreground">
            <span className="text-accent">{"//"}</span> {t.rotulo}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {t.titulo}
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground text-pretty">
            {t.lead}
          </p>
        </div>

        <div className="surgir rounded-xl border border-border bg-muted/20 p-6 sm:p-8">
          <div className="overflow-x-auto">
            <div className="min-w-max font-mono text-xs leading-relaxed">
              <p className="text-foreground">{t.raiz}</p>

              <div className="mt-1 grid grid-cols-[auto_auto_1fr] gap-x-3">
                {ARVORE.map(({ ramo, nome }) => (
                  <div key={nome} className="contents">
                    <span className="text-border">{ramo}</span>
                    <span className="text-foreground">{nome}</span>
                    {/* O comentário fica em coluna própria pra alinhar sem
                        depender de contar espaços dentro da string. */}
                    <span className="text-muted-foreground">{t.arvore[nome]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ol className="mt-16 grid gap-10 xl:grid-cols-3 xl:gap-0">
        {t.etapas.map(({ verbo, titulo, linha, marcas }, indice) => {
          const Icone = ICONES[indice];

          return (
            <li
              key={verbo}
              className={`surgir relative ${
                indice > 0 ? "xl:border-l xl:border-border xl:pl-10" : ""
              } ${indice < t.etapas.length - 1 ? "xl:pr-10" : ""}`}
            >
              {/* A seta senta em cima da divisória, com o fundo da página atrás
                  dela, pra linha parecer cortada e não atravessada. */}
              {indice > 0 ? (
                <ArrowRight
                  aria-hidden
                  strokeWidth={1.75}
                  className="absolute top-1/2 -left-3 hidden size-6 -translate-y-1/2 bg-background px-1 text-accent xl:block"
                />
              ) : null}

              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-accent">
                  {String(indice + 1).padStart(2, "0")}
                </span>
                <Icone
                  className={`size-5 text-muted-foreground ${indice === 2 ? "opacity-60" : ""}`}
                  strokeWidth={1.5}
                />
              </div>

              <p className="mt-5 font-mono text-xs text-muted-foreground">
                <span className="text-accent">{"//"}</span> {verbo}
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">{titulo}</h3>
              <p className="mt-2 max-w-md leading-relaxed text-muted-foreground text-pretty xl:max-w-xs">
                {linha}
              </p>

              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[0.7rem] tracking-widest text-muted-foreground uppercase xl:block xl:space-y-1">
                {marcas.map((marca) => (
                  <li key={marca}>{marca}</li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
