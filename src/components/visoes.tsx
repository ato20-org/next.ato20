import { Captura } from "@/components/captura";
import { MarcaAscii } from "@/components/marca-ascii";
import { Video } from "@/components/video";
import type { Idioma } from "@/lib/idioma";

import espectador from "../../docs/capturas/espectador.webp";
import jogador from "../../docs/capturas/jogador.webp";
import mestre from "../../docs/capturas/mestre.webp";

const pt = {
  rotulo: "uma mesa, três telas",
  titulo: (
    <>
      O mestre vê tudo.
      <br />
      A mesa vê o que importa.
    </>
  ),
  lead: "O mestre no aplicativo, a janela do espectador e os celulares no navegador. Quando você põe a cena no ar, as três mudam juntas, e o ping de qualquer um aparece nas três.",
  mestre: { alt: "A visão Mestre do ATO20", nome: "Mestre", papel: "Controla a cena." },
  espectador: {
    alt: "A visão Espectador do ATO20",
    nome: "Espectador",
    papel: "Acompanha a mesa.",
  },
  jogador: { alt: "A visão Jogador do ATO20", nome: "Jogador", papel: "Vê o que precisa." },
  noAplicativo: "no aplicativo",
  alt: "O jogador rola um d20 pelo celular: o dado cai no palco do mestre e entra na lista de rolagens, enquanto o celular mostra a ficha do Bruno com condições, medidores e inventário",
};

const en: typeof pt = {
  rotulo: "one table, three screens",
  titulo: (
    <>
      The GM sees everything.
      <br />
      The table sees what matters.
    </>
  ),
  lead: "The GM in the app, the spectator window and the phones in the browser. When you put a scene on air, all three change together, and anyone's ping shows up on all three.",
  mestre: { alt: "ATO20's GM view", nome: "GM", papel: "Runs the scene." },
  espectador: {
    alt: "ATO20's Spectator view",
    nome: "Spectator",
    papel: "Follows the game.",
  },
  jogador: { alt: "ATO20's Player view", nome: "Player", papel: "Sees what they need." },
  noAplicativo: "in the app",
  alt: "The player rolls a d20 from their phone: the die lands on the GM's stage and goes into the roll list, while the phone shows Bruno's sheet with conditions, meters and inventory",
};

const TEXTO = { pt, en };

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
export function Visoes({ idioma }: { idioma: Idioma }) {
  const t = TEXTO[idioma];

  return (
    <section className="relative isolate mx-auto w-full max-w-3xl overflow-hidden px-6 pt-14 pb-16 sm:pt-16 sm:pb-20 xl:max-w-7xl xl:px-12">
      <MarcaAscii item="potion" className="-left-20 bottom-10 hidden w-[20rem] lg:block" />

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

      <div className="surgir mx-auto mt-16 max-w-4xl">
        <figure className="m-0 mx-auto w-full max-w-2xl">
          <Captura
            idioma={idioma}
            imagem={mestre}
            alt={t.mestre.alt}
            sizes="(min-width: 768px) 42rem, 90vw"
            className="w-full"
          />
          <Legenda nome={t.mestre.nome} papel={t.mestre.papel} />
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
              idioma={idioma}
              imagem={espectador}
              alt={t.espectador.alt}
              sizes="(min-width: 768px) 20rem, 45vw"
              className="w-full"
            />
            <Legenda nome={t.espectador.nome} papel={t.espectador.papel} />
          </figure>

          <figure className="m-0">
            {/* O celular é retrato: sem trava de largura ele ficaria mais alto
                que a coluna inteira do lado. */}
            <div className="mx-auto w-full max-w-[9rem] sm:max-w-[11rem]">
              <Captura
                idioma={idioma}
                imagem={jogador}
                alt={t.jogador.alt}
                sizes="(min-width: 768px) 11rem, 30vw"
                className="w-full"
              />
            </div>
            <Legenda nome={t.jogador.nome} papel={t.jogador.papel} />
          </figure>
        </div>
      </div>

      {/* O diagrama diz quem vê o quê; o vídeo mostra a sessão andando: o
          jogador rola no celular, o dado cai no palco do mestre e entra na
          lista de rolagens. */}
      <div className="surgir mx-auto mt-16 max-w-4xl">
        <p className="font-mono text-sm text-muted-foreground">
          <span className="text-accent">{"//"}</span> {t.noAplicativo}
        </p>
        <Video
          nome="sessao"
          alt={t.alt}
          largura={1280}
          altura={698}
          className="mt-4"
        />
      </div>
    </section>
  );
}
