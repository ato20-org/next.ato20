import Image from "next/image";

import fundo from "@/assets/fundo-ascii.png";
import { JanelaDemo } from "@/components/janela-demo";

/**
 * Seção logo abaixo do hero, com o ASCII de uma mesa de RPG ao fundo.
 *
 * O desenho fica em tamanho nativo e sangra pelas laterais em vez de ser
 * escalado pra caber: reduzido, os caracteres se fundem e o ASCII vira textura
 * borrada. Quem corta é o `overflow-hidden` da seção.
 */
export function Mesa() {
  return (
    <section className="relative isolate overflow-hidden py-32 sm:py-40">
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
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          A visão do mestre.
        </h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
          Mestrar em LAN, presencialmente, com os seus amigos.
        </p>

        <div className="mt-12">
          <JanelaDemo cena="Taverna do Javali" />
        </div>
      </div>
    </section>
  );
}
