"use client";

import { type ComponentType, useState, useSyncExternalStore } from "react";

import { ArrowUpRight, Download as IconeBaixar, Terminal } from "lucide-react";

import {
  MarcaAndroid,
  MarcaApple,
  MarcaWindows,
} from "@/components/marcas";
import {
  ORDEM_PLATAFORMAS,
  PLATAFORMAS,
  type PlataformaId,
  detectarPlataforma,
} from "@/lib/plataformas";
import { RELEASES_URL } from "@/lib/projeto";

/**
 * O Linux fica com o terminal do lucide porque não existe logo de traço do Tux:
 * o simple-icons só tem a versão preenchida e detalhada, que destoa do resto.
 * Apple cobre macOS e iOS — é a mesma marca.
 */
const ICONES: Record<PlataformaId, ComponentType<React.SVGProps<SVGSVGElement>>> = {
  linux: Terminal,
  windows: MarcaWindows,
  macos: MarcaApple,
  android: MarcaAndroid,
  ios: MarcaApple,
};

/** A plataforma nunca muda depois de detectada, então não há o que assinar. */
const naoInscrever = () => () => {};
const lerNoServidor = (): PlataformaId | null => null;

export function Download() {
  // O sistema só é conhecido no cliente: no servidor o snapshot é `null`, então
  // o HTML renderizado e a primeira renderização do cliente batem, e a detecção
  // aparece logo depois da hidratação.
  const detectada = useSyncExternalStore(
    naoInscrever,
    detectarPlataforma,
    lerNoServidor,
  );
  // A detecção erra em UA travado ou navegador atípico; o usuário pode trocar.
  const [trocada, setTrocada] = useState<PlataformaId | null>(null);

  const escolhida = trocada ?? detectada;
  const plataforma = escolhida ? PLATAFORMAS[escolhida] : null;
  // Antes de saber o sistema, a seta de download diz o que o botão faz.
  const IconeDoBotao = escolhida ? ICONES[escolhida] : IconeBaixar;

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          // Ainda não existe build publicada: o botão é a forma final, sem ação.
          aria-disabled={!plataforma?.disponivel}
          className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-lg bg-foreground px-5 text-sm font-medium text-background transition-opacity aria-disabled:cursor-not-allowed aria-disabled:opacity-60"
        >
          <IconeDoBotao className="size-4" strokeWidth={1.75} />
          {plataforma ? `Baixar para ${plataforma.nome}` : "Baixar o ATO20"}
          <span className="rounded border border-background/25 px-1.5 py-0.5 font-mono text-[0.65rem] tracking-wide uppercase">
            em breve
          </span>
        </button>

        <a
          href={RELEASES_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-12 items-center justify-center gap-1.5 rounded-lg border border-border px-5 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
        >
          Acompanhar as releases
          <ArrowUpRight className="size-4" strokeWidth={1.75} />
        </a>
      </div>

      <p className="mt-4 font-mono text-xs text-muted-foreground">
        {plataforma ? plataforma.artefato : "detectando o seu sistema…"}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-x-1.5 gap-y-2">
        <span className="mr-1 font-mono text-xs text-muted-foreground">
          outros:
        </span>
        {ORDEM_PLATAFORMAS.map((id) => {
          const Icone = ICONES[id];

          return (
            <button
              key={id}
              type="button"
              onClick={() => setTrocada(id)}
              aria-pressed={escolhida === id}
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground aria-pressed:bg-muted aria-pressed:text-foreground"
            >
              <Icone className="size-3.5" strokeWidth={1.75} />
              {PLATAFORMAS[id].nome}
            </button>
          );
        })}
      </div>
    </div>
  );
}
