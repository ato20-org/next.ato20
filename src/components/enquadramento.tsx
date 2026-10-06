import { DemoCamera } from "@/components/demo-camera";
import { Video } from "@/components/video";
import type { Idioma } from "@/lib/idioma";

/**
 * O que a câmera faz, em quatro linhas (`recursos`). Cada uma sai das notas de
 * versão do aplicativo (`versoes.ts`): o que está aqui é o que a `main` já faz,
 * e não o que está a caminho.
 */
const pt = {
  rotulo: "câmera",
  titulo: (
    <>
      A mesa vê o que
      <br />
      você enquadra.
    </>
  ),
  lead:
    "Cada cena guarda câmeras com nome, e pôr no ar é escolher uma. Você continua vendo o mapa inteiro; a janela do espectador recebe só o recorte.",
  recursos: [
    {
      titulo: "Câmeras com nome",
      linha: "Enquadramentos guardados na cena, numa pílula no canto do palco. Transmitir é escolher um, e a troca corta em fade na janela do espectador.",
    },
    {
      titulo: "Formato livre",
      linha: "A torre em pé, o corredor deitado: o canto da moldura estica livre, e o espectador mostra o recorte inteiro, com faixa preta no que sobra.",
    },
    {
      titulo: "Cinegrafista no V",
      linha: "Segurando V, o mouse move o enquadramento sem mexer no mapa, e a janela do espectador desliza junto. Com Shift, a câmera anda num eixo só.",
    },
    {
      titulo: "O que a mesa não viu",
      linha: "As câmeras fora do ar ficam apagadas no seu palco: você vê o que os jogadores ainda não estão vendo.",
    },
  ],
  noAplicativo: "no aplicativo",
  alt: "O mestre troca de câmera e move o enquadramento no palco; ao lado, a janela do espectador acompanha, mostrando só o recorte que está no ar",
};

const en: typeof pt = {
  rotulo: "camera",
  titulo: (
    <>
      The table sees
      <br />
      what you frame.
    </>
  ),
  lead:
    "Every scene keeps named cameras, and going on air is picking one. You still see the whole map; the spectator window only gets what's in frame.",
  recursos: [
    {
      titulo: "Named cameras",
      linha: "Shots saved in the scene, in a pill at the corner of the stage. Pick one to put on air, and the spectator window cuts to it with a fade.",
    },
    {
      titulo: "Any shape",
      linha: "A tall tower, a long corridor: the frame's corner stretches freely, and the spectator shows the whole shot, with black bars filling the rest.",
    },
    {
      titulo: "Camera operator on V",
      linha: "Hold V and the mouse moves the frame without moving the map, and the spectator window glides along. With Shift, the camera sticks to one axis.",
    },
    {
      titulo: "What the table hasn't seen",
      linha: "Cameras that aren't on air stay dimmed on your stage: you see what the players can't see yet.",
    },
  ],
  noAplicativo: "in the app",
  alt: "The GM switches cameras and moves the frame on the stage; next to it, the spectator window follows along, showing only the shot that's on air",
};

const TEXTO = { pt, en };

/**
 * A câmera, que é o que faz o espectador parecer uma cena e não um mapa aberto.
 *
 * Vem logo depois do hero porque é a parte que nenhuma captura explica: o que
 * importa é o movimento entre o que o mestre vê e o que a mesa recebe. Daí a
 * demonstração em vez de imagem — a pessoa arrasta a moldura e vê o
 * espectador seguir.
 */
export function Enquadramento({ idioma }: { idioma: Idioma }) {
  const t = TEXTO[idioma];

  return (
    <section
      id="camera"
      className="relative isolate mx-auto w-full max-w-3xl scroll-mt-8 overflow-hidden px-6 py-16 sm:py-20 xl:max-w-7xl xl:px-12"
    >
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

      <div className="surgir mt-12">
        <DemoCamera idioma={idioma} />
      </div>

      <ul className="mt-14 grid gap-8 sm:grid-cols-2 xl:grid-cols-4 xl:gap-10">
        {t.recursos.map(({ titulo, linha }) => (
          <li key={titulo} className="surgir">
            <h3 className="font-mono text-xs tracking-widest text-foreground uppercase">
              {titulo}
            </h3>
            <p className="mt-2 leading-relaxed text-muted-foreground text-pretty">{linha}</p>
          </li>
        ))}
      </ul>

      {/* Depois da demonstração, a prova: o aplicativo de verdade, com a
          janela do espectador ao lado. A demo explica o conceito com um mapa
          desenhado; o vídeo mostra que é assim mesmo, com uma campanha real. */}
      <div className="surgir mt-16">
        <p className="font-mono text-sm text-muted-foreground">
          <span className="text-accent">{"//"}</span> {t.noAplicativo}
        </p>
        <Video
          nome="camera"
          alt={t.alt}
          largura={1280}
          altura={698}
          className="mt-4"
        />
      </div>
    </section>
  );
}
