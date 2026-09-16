"use client";

import { type MouseEvent, useRef } from "react";

import Image, { type StaticImageData } from "next/image";

import { Maximize2, X } from "lucide-react";

/**
 * Uma captura do aplicativo que dá pra olhar de perto.
 *
 * O hover cresce só um pouco: é o convite, não a leitura. Quem quer ler a
 * interface clica e recebe a imagem inteira em tela cheia — e é isso que também
 * atende o celular, que não tem hover nenhum pra oferecer.
 *
 * A tela cheia é um `<dialog>` de verdade: o Escape, o foco preso dentro dele e
 * o resto da página inerte vêm do navegador, sem código nosso pra manter.
 */
export function Captura({
  imagem,
  alt,
  sizes,
  className = "",
}: {
  imagem: StaticImageData;
  alt: string;
  sizes: string;
  className?: string;
}) {
  const dialogo = useRef<HTMLDialogElement>(null);

  // O alvo do clique só é o próprio `<dialog>` quando o clique cai no fundo:
  // qualquer coisa dentro dele é filha, e aí o alvo é outro.
  function fecharPeloFundo(evento: MouseEvent<HTMLDialogElement>) {
    if (evento.target === dialogo.current) dialogo.current?.close();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => dialogo.current?.showModal()}
        aria-label={`Ampliar: ${alt}`}
        className={`group relative block cursor-zoom-in hover:z-10 ${className}`}
      >
        <Image
          src={imagem}
          alt={alt}
          placeholder="blur"
          sizes={sizes}
          className="rounded-xl border border-border shadow-2xl shadow-black/60 transition-transform duration-300 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />

        <span className="pointer-events-none absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-md border border-border bg-background/85 px-2 py-1 font-mono text-[0.65rem] text-muted-foreground opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <Maximize2 className="size-3" strokeWidth={1.75} />
          ampliar
        </span>
      </button>

      <dialog
        ref={dialogo}
        onClick={fecharPeloFundo}
        className="m-auto max-h-none max-w-none bg-transparent p-4 text-foreground backdrop:bg-black/85 backdrop:backdrop-blur-sm sm:p-8"
      >
        <div className="relative">
          <Image
            src={imagem}
            alt={alt}
            placeholder="blur"
            // Em tela cheia a imagem é o conteúdo: pede o maior tamanho que a
            // largura da janela justifica.
            sizes="95vw"
            className="h-auto max-h-[88vh] w-auto max-w-[92vw] rounded-lg border border-border"
          />

          <button
            type="button"
            onClick={() => dialogo.current?.close()}
            aria-label="Fechar"
            className="absolute -top-3 -right-3 inline-flex size-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-4" strokeWidth={1.75} />
          </button>
        </div>

        <p className="mt-3 text-center font-mono text-xs text-muted-foreground">
          clique fora ou aperte Esc pra fechar
        </p>
      </dialog>
    </>
  );
}
