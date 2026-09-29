"use client";

import { useEffect, useRef } from "react";

import { useMenosMovimento } from "@/lib/movimento";

/**
 * Um trecho do aplicativo rodando, no lugar do GIF.
 *
 * O mesmo trecho que no README é um GIF de 14 MB aqui é um WebM de 1 MB: o GIF
 * existe lá porque o GitHub não toca vídeo sozinho, e aqui essa limitação não
 * existe. Os arquivos moram em `public/midia/`, com o MP4 atrás do WebM para o
 * Safari antigo, e um poster do quadro que melhor resume o trecho.
 *
 * Toca só enquanto está na tela. `preload="none"` faz o poster ser a única
 * coisa baixada até alguém rolar até aqui, e sair da tela pausa: a página tem
 * mais de um vídeo, e todos rodando ao mesmo tempo em segundo plano custariam
 * bateria de quem só está lendo o topo.
 *
 * Com `prefers-reduced-motion`, não toca sozinho: fica o poster e os controles
 * do navegador, e a pessoa decide.
 */
export function Video({
  nome,
  alt,
  largura,
  altura,
  className = "",
}: {
  /** O nome dos arquivos em `public/midia/`, sem extensão. */
  nome: string;
  alt: string;
  largura: number;
  altura: number;
  className?: string;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const reduzir = useMenosMovimento();

  useEffect(() => {
    const elemento = video.current;
    if (!elemento || reduzir) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          // O navegador pode recusar o play (economia de dados, aba em
          // segundo plano); aí fica o poster, que é o mesmo que não tocar.
          elemento.play().catch(() => {});
        } else {
          elemento.pause();
        }
      },
      { threshold: 0.25 },
    );

    observador.observe(elemento);
    return () => observador.disconnect();
  }, [reduzir]);

  return (
    <video
      ref={video}
      muted
      loop
      playsInline
      preload="none"
      controls={reduzir}
      poster={`/midia/${nome}.webp`}
      width={largura}
      height={altura}
      aria-label={alt}
      className={`h-auto w-full rounded-xl border border-border bg-muted shadow-2xl shadow-black/60 ${className}`}
    >
      <source src={`/midia/${nome}.webm`} type="video/webm" />
      <source src={`/midia/${nome}.mp4`} type="video/mp4" />
    </video>
  );
}
