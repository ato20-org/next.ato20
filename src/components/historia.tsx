import { Video } from "@/components/video";
import type { Idioma } from "@/lib/idioma";

/** Os `recursos` também saem das notas de versão do aplicativo, como os da câmera. */
const pt = {
  rotulo: "história",
  titulo: (
    <>
      A campanha inteira,
      <br />
      não só a cena.
    </>
  ),
  lead: "Quadro pra pensar, nota pra lembrar, e tudo numa árvore de pastas que mora no seu disco.",
  recursos: [
    {
      titulo: "Quadro",
      linha: "Uma folha sem chão: texto direto na folha, setas que seguem o que você move, post-it com letra de mão, imagem, dado e cartão no mesmo lugar. Traço à mão, se quiser.",
    },
    {
      titulo: "Nota",
      linha: "Markdown com prévia ao vivo e barra de formatação. @ cita, e a menção sozinha na linha mostra a imagem, o retrato ou a página do livro.",
    },
    {
      titulo: "Arquivos",
      linha: "Quadros, notas e imagens na mesma árvore de pastas. A nota é arquivo: aparece em dois quadros sem virar duas cópias.",
    },
    {
      titulo: "No ar",
      linha: "Pôr o quadro no ar mostra a folha inteira na janela do espectador e no celular.",
    },
  ],
  alt: "A nota fixada no mapa, depois o Quadro 1 aberto pela aba Arquivos: a Frente de Ferro, com Bruno, o Inimigo, a granada, setas e post-it",
};

const en: typeof pt = {
  rotulo: "story",
  titulo: (
    <>
      The whole campaign,
      <br />
      not just the scene.
    </>
  ),
  lead: "A board to think on, a note to remember, and all of it in a folder tree that lives on your disk.",
  recursos: [
    {
      titulo: "Board",
      linha: "An endless sheet: text right on the page, arrows that follow what you move, handwritten sticky notes, images, dice and cards in the same place. Freehand drawing too, if you like.",
    },
    {
      titulo: "Note",
      linha: "Markdown with live preview and a formatting bar. Type @ to mention something, and a mention on its own line shows the image, the portrait or the book page.",
    },
    {
      titulo: "Files",
      linha: "Boards, notes and images in the same folder tree. A note is a file: it shows up on two boards without becoming two copies.",
    },
    {
      titulo: "On air",
      linha: "Put a board on air and the whole sheet shows up on the spectator window and on the phones.",
    },
  ],
  alt: "The note pinned to the map, then Board 1 opened from the Files tab: the Frente de Ferro, with Bruno, an enemy, the grenade, arrows and a sticky note",
};

const TEXTO = { pt, en };

/**
 * A metade do trabalho do mestre que acontece fora da sessão: pensar a
 * história, anotar, ligar uma coisa na outra.
 *
 * Aqui entra vídeo, e não demonstração, porque o que convence é a ferramenta
 * de verdade com uma campanha de verdade dentro — um quadro desenhado à mão
 * seria mais um diagrama, e a página já tem os seus.
 */
export function Historia({ idioma }: { idioma: Idioma }) {
  const t = TEXTO[idioma];

  return (
    <section className="relative isolate mx-auto w-full max-w-3xl overflow-hidden px-6 py-16 sm:py-20 xl:max-w-7xl xl:px-12">
      <div className="grid gap-12 xl:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] xl:items-center xl:gap-16">
        <div>
          <div className="surgir">
            <p className="font-mono text-sm text-muted-foreground">
              <span className="text-accent">{"//"}</span> {t.rotulo}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {t.titulo}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">
              {t.lead}
            </p>
          </div>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-1">
            {t.recursos.map(({ titulo, linha }) => (
              <li key={titulo} className="surgir">
                <h3 className="font-mono text-xs tracking-widest text-foreground uppercase">
                  {titulo}
                </h3>
                <p className="mt-2 leading-relaxed text-muted-foreground text-pretty">{linha}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* O xl põe o vídeo ao lado do texto, e é aí que a primeira linha do
            texto precisa estar à vista: a ordem no DOM é texto, depois vídeo,
            e o celular lê nessa ordem. */}
        <div className="surgir min-w-0">
          <Video
            nome="arquivos"
            alt={t.alt}
            largura={1226}
            altura={666}
          />
        </div>
      </div>
    </section>
  );
}
