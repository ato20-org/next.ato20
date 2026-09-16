import { Captura } from "@/components/captura";
import { MarcaAscii } from "@/components/marca-ascii";

import espectador from "../../docs/capturas/espectador.webp";
import jogador from "../../docs/capturas/jogador.webp";
import mestre from "../../docs/capturas/mestre.webp";

function Legenda({ nome, papel }: { nome: string; papel: string }) {
  return (
    <figcaption className="mt-4 text-center">
      <span className="block font-mono text-xs tracking-widest uppercase">
        {nome}
      </span>
      <span className="mt-1 block text-sm text-muted-foreground">{papel}</span>
    </figcaption>
  );
}

/**
 * A topologia da mesa: o mestre em cima, e dela saem as duas telas que os
 * outros recebem.
 *
 * É diagrama, não galeria — a hierarquia está no desenho (quem manda fica em
 * cima, quem recebe fica embaixo, ligados pela chave), e por isso o texto pode
 * ser de três palavras por tela. A explicação em prosa era o que fazia esta
 * seção repetir a de cima.
 */
export function Visoes() {
  return (
    <section className="relative isolate mx-auto w-full max-w-3xl overflow-hidden px-6 pt-14 pb-16 sm:pt-16 sm:pb-20 xl:max-w-7xl xl:px-12">
      <MarcaAscii item="potion" className="-left-20 bottom-10 hidden w-[20rem] lg:block" />

      <div className="surgir">
        <p className="font-mono text-sm text-muted-foreground">
          <span className="text-accent">{"//"}</span> uma mesa, três telas
        </p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          A mesma sessão.
          <br />
          Cada um no seu lugar.
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
          Em LAN, sem servidor e sem conta: quem serve as telas é o próprio
          aplicativo, na sua rede.
        </p>
      </div>

      <div className="surgir mx-auto mt-16 max-w-4xl">
        <figure className="m-0 mx-auto w-full max-w-2xl">
          <Captura
            imagem={mestre}
            alt="A visão Mestre do ATO20"
            sizes="(min-width: 768px) 42rem, 90vw"
            className="w-full"
          />
          <Legenda nome="Mestre" papel="Controla a cena." />
        </figure>

        {/* A chave é desenhada com três réguas de 1px: o tronco desce do meio,
            a travessa abre, e as duas pernas caem em cima do centro de cada
            coluna de baixo — 25% e 75% da largura. */}
        <div aria-hidden className="mx-auto h-8 w-px bg-border" />
        <div aria-hidden className="relative h-8">
          <div className="absolute top-0 right-1/4 left-1/4 h-px bg-border" />
          <div className="absolute top-0 left-1/4 h-full w-px bg-border" />
          <div className="absolute top-0 right-1/4 h-full w-px bg-border" />
        </div>

        <div className="grid grid-cols-2 gap-6 sm:gap-10">
          <figure className="m-0">
            <Captura
              imagem={espectador}
              alt="A visão Espectador do ATO20"
              sizes="(min-width: 768px) 20rem, 45vw"
              className="w-full"
            />
            <Legenda nome="Espectador" papel="Acompanha a mesa." />
          </figure>

          <figure className="m-0">
            {/* O celular é retrato: sem trava de largura ele ficaria mais alto
                que a coluna inteira do lado. */}
            <div className="mx-auto w-full max-w-[9rem] sm:max-w-[11rem]">
              <Captura
                imagem={jogador}
                alt="A visão Jogador do ATO20"
                sizes="(min-width: 768px) 11rem, 30vw"
                className="w-full"
              />
            </div>
            <Legenda nome="Jogador" papel="Vê o que precisa." />
          </figure>
        </div>
      </div>
    </section>
  );
}
