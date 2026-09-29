import Image from "next/image";
import {
  ChevronDown,
  Clapperboard,
  Maximize2,
  Minus,
  PanelsTopLeft,
  Settings,
  Sparkles,
  Volume2,
  X,
} from "lucide-react";

import marca from "@/assets/marca-ato20.png";
import { DemoMestre } from "@/components/demo-mestre";
import { ULTIMA_RELEASE } from "@/lib/releases";

/**
 * A versão que a barra mostra sai da release publicada, e não de um número
 * escrito aqui: assim a ilustração envelhece junto com o aplicativo em vez de
 * virar mentira na próxima tag.
 */
const VERSAO = ULTIMA_RELEASE?.tag.replace(/^v/, "").replace(/-.*$/, "");

/**
 * Moldura da demo: a mesma barra fina que o aplicativo desenha por conta
 * própria (ele roda sem decoração do sistema). Repetir a barra aqui é o que faz
 * a captura parecer o programa, e não uma imagem solta no meio da página.
 *
 * A barra carrega, da esquerda pra direita: a versão, a marca, a campanha, o
 * menu de abas e o código da mesa — o que os jogadores digitam pra entrar. No
 * meio fica o que está sendo editado, e à direita o que mudou, o volume, as
 * configurações e os botões da janela.
 */
export function JanelaDemo({
  cena,
  campanha = "Crônicas do Javali",
  codigo = "VGMBWH",
}: {
  cena?: string;
  campanha?: string;
  codigo?: string;
}) {
  return (
    <figure className="m-0 overflow-hidden rounded-xl border border-border bg-muted/40 shadow-2xl shadow-black/60 backdrop-blur-sm">
      <div className="relative flex h-8 min-w-240 items-center gap-2 border-b border-border px-2.5">
        {VERSAO ? (
          <span className="font-mono text-[10px] text-muted-foreground/70">
            {VERSAO}
          </span>
        ) : null}
        <Image src={marca} alt="" className="h-3.5 w-auto opacity-80" />
        <span className="font-mono text-xs font-medium">ATO20</span>

        {/* O nome da campanha aberta, e não o do sistema de regras: é o que a
            janela É. */}
        <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
          {campanha}
          <ChevronDown className="size-3" strokeWidth={1.75} />
        </span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <PanelsTopLeft className="size-3" strokeWidth={1.75} />
          Abas
          <ChevronDown className="size-3" strokeWidth={1.75} />
        </span>

        {/* O código da mesa. É por ele que os celulares e o espectador entram. */}
        <span className="rounded border border-border bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] tracking-widest text-muted-foreground">
          {codigo}
        </span>

        {cena ? (
          <span className="pointer-events-none absolute inset-x-0 flex items-center justify-center gap-1.5 font-mono text-xs text-muted-foreground">
            <Clapperboard className="size-3" strokeWidth={1.75} />
            Editando {cena}
          </span>
        ) : null}

        {/* O que mudou, o volume da máquina e as configurações, antes dos
            botões da janela. */}
        <span className="relative ml-auto flex items-center gap-3 text-muted-foreground">
          <Sparkles className="size-3.5" strokeWidth={1.75} />
          <Volume2 className="size-3.5" strokeWidth={1.75} />
          <Settings className="size-3.5" strokeWidth={1.75} />
          <Minus className="size-3.5" strokeWidth={1.75} />
          <Maximize2 className="size-3" strokeWidth={1.75} />
          <X className="size-3.5" strokeWidth={1.75} />
        </span>
      </div>

      <DemoMestre cena={cena} />
    </figure>
  );
}
