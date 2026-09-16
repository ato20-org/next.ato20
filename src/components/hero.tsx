import { AsciiLogo } from "@/components/ascii-logo";
import { Cabecalho } from "@/components/cabecalho";
import { Download } from "@/components/download";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="grade pointer-events-none absolute inset-0 -z-10" aria-hidden />

      <Cabecalho />

      <div className="revelar mx-auto grid w-full max-w-3xl gap-16 px-6 pt-12 pb-20 sm:pt-16 sm:pb-24 xl:max-w-7xl xl:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] xl:items-center xl:gap-12 xl:px-12">
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

          <Download />

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
