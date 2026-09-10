import Image from "next/image";

import { Heart, Network, Smartphone } from "lucide-react";

import marca from "@/assets/marca-ato20.png";
import { AsciiLogo } from "@/components/ascii-logo";
import { Download } from "@/components/download";
import { FundoDeDados } from "@/components/fundo-de-dados";
import { MarcaGithub } from "@/components/marcas";
import { REPO_URL } from "@/lib/projeto";

const PRINCIPIOS = [
  { icone: Network, texto: "mestre em LAN, presencialmente, com os seus amigos" },
  {
    icone: Smartphone,
    texto: "no celular em breve, atrás do melhor desempenho possível",
  },
  {
    icone: Heart,
    texto: "open source: é a minha contribuição pra comunidade que eu amo",
  },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="grade absolute inset-0" aria-hidden />
        <FundoDeDados />
      </div>

      <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-6 xl:max-w-7xl xl:px-12">
        <span className="flex items-center gap-2.5">
          {/* A marca já vem branca com alpha: o `alt` fica vazio porque o
              nome do projeto está escrito do lado. */}
          <Image src={marca} alt="" className="h-5 w-auto" priority />
          <span className="font-mono text-sm font-medium tracking-tight">
            ATO20
          </span>
        </span>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <MarcaGithub className="size-4" />
          github
        </a>
      </header>

      <div className="revelar mx-auto grid w-full max-w-3xl gap-16 px-6 pt-16 pb-24 sm:pt-24 sm:pb-32 xl:max-w-7xl xl:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] xl:items-center xl:gap-12 xl:px-12">
        <div>
          <h1 className="text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
            ATO20
            <span className="mt-3 block text-2xl font-normal text-muted-foreground sm:text-3xl">
              a IDE para RPG de mesa
            </span>
          </h1>

          <p className="mt-7 font-mono text-sm text-muted-foreground">
            <span className="text-accent">{"//"}</span> não é um VTT
          </p>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Pra quem não tem grana pra comprar miniatura, mesa, mapa e nem dado
            físico. Você monta a mesa do jeito que monta um projeto.
          </p>

          <p className="mt-8 max-w-xl text-lg leading-relaxed font-medium text-pretty">
            Se sinta um desenvolvedor de mesas de RPG.
            <br />
            Se sinta um filmmaker e faça cenas impactantes.
          </p>

          <Download />

          <ul className="mt-16 space-y-2.5 border-t border-border pt-8 font-mono text-xs text-muted-foreground">
            {PRINCIPIOS.map(({ icone: Icone, texto }) => (
              <li key={texto} className="flex items-center gap-2.5">
                <Icone className="size-3.5 shrink-0" strokeWidth={1.75} />
                {texto}
              </li>
            ))}
          </ul>
        </div>

        {/* Fica na esquerda, mas depois do texto no DOM: o h1 é o começo do
            conteúdo, e o desenho é decoração `aria-hidden`.
            Só entra a partir de xl — em lg a coluna fica com ~224px, o que dá
            menos de 2px por caractere: vira borrão, não desenho. */}
        <AsciiLogo className="hidden xl:order-first xl:block" />
      </div>
    </section>
  );
}
