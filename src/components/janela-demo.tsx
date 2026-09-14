import Image from "next/image";
import { ChevronDown, Clapperboard, LayoutGrid, Maximize2, Minus, Settings, X } from "lucide-react";

import marca from "@/assets/marca-ato20.png";
import { DemoMestre } from "@/components/demo-mestre";

/**
 * Moldura da demo: a mesma barra fina que o aplicativo desenha por conta
 * própria (ele roda sem decoração do sistema). Repetir a barra aqui é o que faz
 * a captura parecer o programa, e não uma imagem solta no meio da página.
 *
 * A barra carrega, da esquerda pra direita: a marca, o sistema da campanha, o
 * menu de abas e o código da mesa — o que os jogadores digitam pra entrar. No
 * meio fica o que está sendo editado, e à direita os botões da janela.
 */
export function JanelaDemo({ cena, codigo = "VGMBWH" }: { cena?: string; codigo?: string }) {
  return (
    <figure className="m-0 overflow-x-auto overflow-y-hidden rounded-xl border border-border bg-muted/40 shadow-2xl shadow-black/60 backdrop-blur-sm">
      <div className="relative flex h-8 min-w-240 items-center gap-2 border-b border-border px-2.5">
        <Image src={marca} alt="" className="h-3.5 w-auto opacity-80" />
        <span className="font-mono text-xs font-medium">ATO20</span>

        <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
          Brutal
          <ChevronDown className="size-3" strokeWidth={1.75} />
        </span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <LayoutGrid className="size-3" strokeWidth={1.75} />
          Abas
          <ChevronDown className="size-3" strokeWidth={1.75} />
        </span>

        {/* O código da mesa. É por ele que os celulares e a TV entram. */}
        <span className="rounded border border-border bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] tracking-widest text-muted-foreground">
          {codigo}
        </span>

        {cena ? (
          <span className="pointer-events-none absolute inset-x-0 flex items-center justify-center gap-1.5 font-mono text-xs text-muted-foreground">
            <Clapperboard className="size-3" strokeWidth={1.75} />
            Editando {cena}
          </span>
        ) : null}

        <span className="relative ml-auto flex items-center gap-3 text-muted-foreground">
          <Settings className="size-3.5" strokeWidth={1.75} />
          <Minus className="size-3.5" strokeWidth={1.75} />
          <Maximize2 className="size-3" strokeWidth={1.75} />
          <X className="size-3.5" strokeWidth={1.75} />
        </span>
      </div>

      <DemoMestre cena={cena} />

      <figcaption className="min-w-240 border-t border-border px-3 py-2 font-mono text-xs text-muted-foreground">
        ilustração da visão do mestre
      </figcaption>
    </figure>
  );
}
