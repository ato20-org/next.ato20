import { Heart, MapPin, TriangleAlert } from "lucide-react";

import { Download } from "@/components/download";
import { MarcaAscii } from "@/components/marca-ascii";
import { AUTOR_URL } from "@/lib/projeto";
import { ULTIMA_RELEASE } from "@/lib/releases";

/**
 * O fecho da página: o convite pra baixar e a assinatura do projeto.
 *
 * O aviso de obra em andamento fica aqui embaixo, e não no hero, porque quem
 * chegou até o fim já sabe o que o ATO20 faz — o aviso ajusta a expectativa de
 * quem vai baixar agora, e não a de quem acabou de chegar.
 */
export function Fechamento() {
  return (
    <section className="relative isolate mx-auto w-full max-w-3xl overflow-hidden px-6 py-24 sm:py-28 xl:max-w-7xl xl:px-12">
      <MarcaAscii item="sword" className="-right-24 -top-10 hidden w-[36rem] lg:block" />

      <div className="surgir mx-auto max-w-2xl text-center">
        <p className="font-mono text-sm text-muted-foreground">
          <span className="text-accent">{"//"}</span> pronto pra jogar?
        </p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Sua mesa.
          <br />
          Do seu jeito.
        </h2>

        {/* O botão sozinho: a lista de plataformas já apareceu no hero. */}
        <div className="flex flex-col items-center">
          <Download simples />
        </div>

        <p className="mt-10 flex items-start justify-center gap-2 text-left font-mono text-xs leading-relaxed text-muted-foreground">
          <TriangleAlert
            className="mt-0.5 size-3.5 shrink-0 text-accent"
            strokeWidth={1.75}
          />
          <span>
            beta: dá pra jogar com ele, e ainda há aresta — principalmente de
            portabilidade e de desempenho. O{" "}
            <a
              href={AUTOR_URL}
              target="_blank"
              rel="noreferrer"
              className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
            >
              @valb-mig
            </a>{" "}
            está nisso a todo vapor.
          </span>
        </p>
      </div>

      <p className="mt-20 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-border pt-8 font-mono text-xs text-muted-foreground">
        <span className="flex items-center gap-2">
          <Heart className="size-3.5 shrink-0" strokeWidth={1.75} />
          open source
        </span>
        <span className="text-border">·</span>
        <span className="flex items-center gap-2">
          <MapPin className="size-3.5 shrink-0" strokeWidth={1.75} />
          feito no Brasil
          {/* O locale no lugar da bandeira: emoji de bandeira não desenha igual
              em todo sistema, e a sigla combina com o resto. */}
          <span className="rounded border border-border px-1 py-px text-[0.6rem] tracking-widest text-accent">
            pt-BR
          </span>
        </span>
        {ULTIMA_RELEASE ? (
          <>
            <span className="text-border">·</span>
            <span>{ULTIMA_RELEASE.tag}</span>
          </>
        ) : null}
      </p>
    </section>
  );
}
