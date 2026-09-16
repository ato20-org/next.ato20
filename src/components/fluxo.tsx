import { type ComponentType } from "react";

import { ArrowRight, Folder, IdCard } from "lucide-react";

import { Dado } from "@/components/dado";
import { MarcaAscii } from "@/components/marca-ascii";
import { D20 } from "@/lib/dados-geometria";

const RAIZ = "~/campanhas/campanha-do-sol";

/** A estrutura que o aplicativo cria de verdade, em `vault/mod.rs`. */
const ARVORE = [
  { ramo: "├──", nome: "config.json", nota: "nome e código da mesa" },
  { ramo: "├──", nome: "cenas/", nota: "o que entra no ar" },
  { ramo: "├──", nome: "assets/", nota: "mapas, retratos, sons" },
  { ramo: "└──", nome: ".ato20/", nota: "o estado da sessão" },
];

type Etapa = {
  verbo: string;
  titulo: string;
  linha: string;
  /** Os nomes que essa etapa tem dentro do aplicativo. */
  marcas: string[];
  icone: ComponentType<React.SVGProps<SVGSVGElement>>;
};

const ETAPAS: Etapa[] = [
  {
    verbo: "preparar",
    titulo: "Sua campanha.",
    linha: "Uma pasta no seu disco, não uma linha no banco de dados de alguém.",
    marcas: ["cenas", "mapas", "sons"],
    icone: Folder,
  },
  {
    verbo: "organizar",
    titulo: "Seus personagens.",
    linha: "Cada um com o que precisa na hora de entrar em cena.",
    marcas: ["fichas", "retratos", "inventário"],
    icone: IdCard,
  },
  {
    verbo: "mestrar",
    titulo: "A mesa.",
    linha: "Abra a sessão e passe o código: a mesa inteira entra.",
    marcas: ["código", "TV", "celulares"],
    // O d20 de traço é o mesmo do fundo do site: o ícone da última etapa é a
    // marca do projeto, e não um símbolo genérico de "jogar". Vem mais apagado
    // porque tem muito mais linha que uma pasta ou um crachá — no mesmo tom,
    // puxaria o olho pra terceira etapa sem motivo.
    icone: (props) => <Dado poliedro={D20} forca={22} {...props} />,
  },
];

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
export function Fluxo() {
  return (
    <section className="relative isolate mx-auto w-full max-w-3xl overflow-hidden px-6 py-16 sm:py-20 xl:max-w-7xl xl:px-12">
      <MarcaAscii item="axe" className="-right-16 bottom-0 hidden w-[34rem] lg:block" />

      <div className="grid gap-10 xl:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] xl:items-center xl:gap-20">
        <div className="surgir">
          <p className="font-mono text-sm text-muted-foreground">
            <span className="text-accent">{"//"}</span> do projeto à mesa
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Do seu arquivo
            <br />à próxima sessão.
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground text-pretty">
            Organize a campanha, monte os personagens e abra a mesa. Tudo no
            mesmo lugar.
          </p>
        </div>

        <div className="surgir rounded-xl border border-border bg-muted/20 p-6 sm:p-8">
          <div className="overflow-x-auto">
            <div className="min-w-max font-mono text-xs leading-relaxed">
              <p className="text-foreground">{RAIZ}</p>

              <div className="mt-1 grid grid-cols-[auto_auto_1fr] gap-x-3">
                {ARVORE.map(({ ramo, nome, nota }) => (
                  <div key={nome} className="contents">
                    <span className="text-border">{ramo}</span>
                    <span className="text-foreground">{nome}</span>
                    {/* O comentário fica em coluna própria pra alinhar sem
                        depender de contar espaços dentro da string. */}
                    <span className="text-muted-foreground">{nota}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ol className="mt-16 grid gap-10 xl:grid-cols-3 xl:gap-0">
        {ETAPAS.map(({ verbo, titulo, linha, marcas, icone: Icone }, indice) => (
          <li
            key={verbo}
            className={`surgir relative ${
              indice > 0 ? "xl:border-l xl:border-border xl:pl-10" : ""
            } ${indice < ETAPAS.length - 1 ? "xl:pr-10" : ""}`}
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
        ))}
      </ol>
    </section>
  );
}
