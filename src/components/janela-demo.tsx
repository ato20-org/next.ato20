import Image from "next/image";
import { Clapperboard, Maximize2, Minus, X } from "lucide-react";

import marca from "@/assets/marca-ato20.png";
import { DemoMestre } from "@/components/demo-mestre";

/**
 * Moldura da demo: a mesma barra fina que o aplicativo desenha por conta
 * própria (ele roda sem decoração do sistema). Repetir a barra aqui é o que faz
 * a captura parecer o programa, e não uma imagem solta no meio da página.
 */
export function JanelaDemo({ cena }: { cena?: string }) {
  return (
    <figure className="m-0 overflow-x-auto overflow-y-hidden rounded-xl border border-border bg-muted/40 shadow-2xl shadow-black/60 backdrop-blur-sm">
      <div className="flex h-9 min-w-[56rem] items-center gap-2.5 border-b border-border px-3">
        <Image src={marca} alt="" className="h-3.5 w-auto opacity-80" />
        <span className="font-mono text-xs font-medium">ATO20</span>
        {cena ? (
          <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <Clapperboard className="size-3" strokeWidth={1.75} />
            {cena}
          </span>
        ) : null}

        <span className="ml-auto flex items-center gap-3 text-muted-foreground">
          <Minus className="size-3.5" strokeWidth={1.75} />
          <Maximize2 className="size-3" strokeWidth={1.75} />
          <X className="size-3.5" strokeWidth={1.75} />
        </span>
      </div>

      <DemoMestre />

      <figcaption className="min-w-[56rem] border-t border-border px-3 py-2 font-mono text-xs text-muted-foreground">
        ilustração da visão do mestre
      </figcaption>
    </figure>
  );
}
