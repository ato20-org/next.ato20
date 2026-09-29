import { DemoCamera } from "@/components/demo-camera";
import { Video } from "@/components/video";

/**
 * O que a câmera faz, em quatro linhas. Cada uma sai das notas de versão do
 * aplicativo (`versoes.ts`): o que está aqui é o que a `main` já faz, e não o
 * que está a caminho.
 */
const RECURSOS = [
  {
    titulo: "Câmeras com nome",
    linha: "Enquadramentos guardados na cena, numa pílula no canto do palco, ao lado do zoom. Transmitir é escolher um.",
  },
  {
    titulo: "Corte em fade",
    linha: "Trocar de câmera corta em fade na janela do espectador. Sem nenhuma no ar, a mesa fica escura.",
  },
  {
    titulo: "Cinegrafista no V",
    linha: "Segurando V, o mouse move o enquadramento sem mexer no mapa, e a janela do espectador acompanha sem solavanco.",
  },
  {
    titulo: "O que a mesa não viu",
    linha: "As câmeras fora do ar ficam apagadas no seu palco: você vê o que os jogadores ainda não estão vendo.",
  },
];

/**
 * A câmera, que é o que faz o espectador parecer uma cena e não um mapa aberto.
 *
 * Vem logo depois do hero porque é a parte que nenhuma captura explica: o que
 * importa é o movimento entre o que o mestre vê e o que a mesa recebe. Daí a
 * demonstração em vez de imagem — a pessoa arrasta a moldura e vê o
 * espectador seguir.
 */
export function Enquadramento() {
  return (
    <section
      id="camera"
      className="relative isolate mx-auto w-full max-w-3xl scroll-mt-8 overflow-hidden px-6 py-16 sm:py-20 xl:max-w-7xl xl:px-12"
    >
      <div className="surgir">
        <p className="font-mono text-sm text-muted-foreground">
          <span className="text-accent">{"//"}</span> câmera
        </p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          A mesa vê o que
          <br />
          você enquadra.
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
          Cada cena guarda câmeras com nome, e pôr no ar é escolher uma. Você
          continua vendo o mapa inteiro; a janela do espectador recebe só o recorte.
        </p>
      </div>

      <div className="surgir mt-12">
        <DemoCamera />
      </div>

      <ul className="mt-14 grid gap-8 sm:grid-cols-2 xl:grid-cols-4 xl:gap-10">
        {RECURSOS.map(({ titulo, linha }) => (
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
          <span className="text-accent">{"//"}</span> no aplicativo
        </p>
        <Video
          nome="camera"
          alt="O mestre troca de câmera e move o enquadramento no palco; ao lado, a janela do espectador acompanha, mostrando só o recorte que está no ar"
          largura={1280}
          altura={698}
          className="mt-4"
        />
      </div>
    </section>
  );
}
