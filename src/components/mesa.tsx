import Image from "next/image";

import fundo from "@/assets/fundo-ascii.png";
import { JanelaDemo } from "@/components/janela-demo";
import { Video } from "@/components/video";
import type { Idioma } from "@/lib/idioma";

const pt = {
  rotulo: "interface real",
  titulo: "É assim que a mesa fica na sua tela.",
  lead: "A janela do mestre mostra a cena. O resto da mesa acompanha nas próprias telas.",
  alt: "Da lista de campanhas à mesa: o mestre abre a Floresta Brutal, o mapa aparece com os tokens e a luz, e a câmera se afasta até o recorte que a janela do espectador vê",
  /** A cena aberta na ilustração: tem de ser uma das cenas da `DemoMestre`. */
  cena: "Taverna do Javali",
};

const en: typeof pt = {
  rotulo: "the real interface",
  titulo: "This is how the table looks on your screen.",
  lead: "The GM window shows the scene. The rest of the table follows along on their own screens.",
  alt: "From the campaign list to the table: the GM opens Floresta Brutal, the map appears with its tokens and lighting, and the camera pulls back to the shot the spectator window sees",
  cena: "The Boar's Tavern",
};

const TEXTO = { pt, en };

/**
 * A interface inteira, perto do fim da página, com o ASCII de uma mesa de RPG
 * ao fundo.
 *
 * O desenho fica em tamanho nativo e sangra pelas laterais em vez de ser
 * escalado pra caber: reduzido, os caracteres se fundem e o ASCII vira textura
 * borrada. Quem corta é o `overflow-hidden` da seção.
 */
export function Mesa({ idioma }: { idioma: Idioma }) {
  const t = TEXTO[idioma];

  return (
    <section className="relative isolate overflow-hidden py-20 sm:py-24">
      {/* Duas máscaras em elementos aninhados, uma por eixo. Juntas num
          elemento só precisariam de `mask-composite`, que ainda varia entre
          navegadores. */}
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent,#000_22%,#000_78%,transparent)]">
        <div className="absolute inset-0 [mask-image:linear-gradient(to_right,transparent,#000_14%,#000_86%,transparent)]">
          <Image
            src={fundo}
            alt=""
            // `max-w-none` porque o reset do Tailwind encolhe img pra caber, e
            // é justamente o encolhimento que a gente não quer.
            className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.18]"
            sizes="2890px"
          />
        </div>
      </div>

      <div className="mx-auto w-full max-w-3xl px-6 xl:max-w-7xl xl:px-12">
        <div className="surgir">
          <p className="font-mono text-sm text-muted-foreground">
            <span className="text-accent">{"//"}</span> {t.rotulo}
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {t.titulo}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
            {t.lead}
          </p>
        </div>

        {/* O brilho é só o suficiente pra descolar a janela do fundo: a
            seção inteira existe pra esta imagem. */}
        <div className="surgir relative mt-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[34rem] -translate-y-1/2"
            style={{
              background:
                "radial-gradient(ellipse 55% 50% at 50% 50%, color-mix(in oklch, var(--accent), transparent 93%), transparent 70%)",
            }}
          />
          {/* A ilustração tem 960px de largura fixa: ela desenha a janela
              inteira do aplicativo, com as duas colunas do dock e o tocador, e
              abaixo de 960 isso só caberia rolando de lado ou espremido até
              virar borrão. Em tela estreita entra o aplicativo de verdade, da
              lista de campanhas até a mesa aberta. */}
          <div className="xl:hidden">
            <Video
              nome="intro"
              alt={t.alt}
              largura={1226}
              altura={666}
            />
          </div>

          <div className="hidden xl:block">
            <JanelaDemo idioma={idioma} cena={t.cena} />
          </div>
        </div>
      </div>
    </section>
  );
}
