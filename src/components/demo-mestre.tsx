import { Fragment } from "react";

import {
  ChevronDown,
  ChevronUp,
  Circle,
  Clapperboard,
  Dices,
  EllipsisVertical,
  ExternalLink,
  Eye,
  EyeOff,
  Files,
  FolderClosed,
  FolderPlus,
  GripVertical,
  Layers,
  LibraryBig,
  Lightbulb,
  Link,
  LockOpen,
  MapPin,
  Minus,
  MousePointer2,
  Music,
  Paperclip,
  PanelLeftClose,
  PanelRightClose,
  Pause,
  PersonStanding,
  Plus,
  QrCode,
  Radio,
  Repeat,
  Ruler,
  ScrollText,
  Settings2,
  Spline,
  Square,
  StickyNote,
  Trash2,
  Type,
  Upload,
  Users,
  Volume2,
  X,
  type LucideIcon,
} from "lucide-react";

import { Palco } from "@/components/palco-demo";
import type { Idioma } from "@/lib/idioma";

/**
 * Mockup da visão do mestre.
 *
 * É ilustração, não captura: o Mestre só roda dentro do aplicativo — ele checa
 * a marca do Tauri e recusa uma aba de navegador —, então não há como
 * fotografá-lo daqui.
 *
 * A estrutura não é inventada: ela copia o layout de fábrica do dock
 * (`use-layout-store.ts`) da versão publicada, que é o que qualquer pessoa vê
 * ao abrir o aplicativo pela primeira vez — à esquerda um grupo com quatro
 * abas, à direita dois grupos empilhados, o palco no meio com as réguas nas
 * bordas, e a trilha no rodapé quando há uma escolhida. Os rótulos, os ícones e
 * as dicas saem das telas correspondentes do aplicativo; onde a dica do
 * aplicativo diz "TV", aqui diz janela do espectador. Em inglês, são tradução.
 *
 * A cena em edição não é a que está no ar, de propósito: é o que a página
 * inteira promete — o mestre prepara a próxima enquanto a mesa vê a atual —, e
 * é a única hora em que o "Colocar no ar" aparece.
 *
 * Quando o aplicativo mudar de cara, é aqui que a landing fica velha primeiro.
 * Só os nomes de campanha, cena, câmera, camada, personagem e faixa são
 * fictícios.
 */

/**
 * Ícone de cada aba, como em `iconeDaJanela` do aplicativo. A chave é só o
 * identificador: o nome que aparece mora no texto, em `abas`.
 */
const ABAS = {
  Cenas: Clapperboard,
  Arquivos: Files,
  Retratos: PersonStanding,
  Personagens: Users,
  Biblioteca: LibraryBig,
  Sons: Music,
  Camadas: Layers,
} satisfies Record<string, LucideIcon>;

type NomeDeAba = keyof typeof ABAS;

/**
 * As ferramentas das réguas, com o ícone de cada uma. Rótulos e dicas moram no
 * texto, em `ferramentas`, e saem de `pilula-de-desenho.tsx` e
 * `mestre-toolbar.tsx`.
 */
const FERRAMENTAS = {
  quadrado: Square,
  circulo: Circle,
  tracoLivre: Spline,
  texto: Type,
  ponto: MapPin,
  postit: StickyNote,
  luz: Lightbulb,
  regua: Ruler,
} satisfies Record<string, LucideIcon>;

type NomeDeFerramenta = keyof typeof FERRAMENTAS;

/** A régua da borda esquerda: desenhar. */
const REGUA_DE_DESENHO: NomeDeFerramenta[][] = [
  ["quadrado", "circulo", "tracoLivre"],
  ["texto"],
];

/** A régua da borda direita: o que se crava no mapa, e a medida. */
const REGUA_DO_MAPA: NomeDeFerramenta[][] = [["ponto", "postit", "luz"], ["regua"]];

/**
 * O texto da maquete: a interface e os dados de exemplo.
 *
 * O aplicativo só fala português; o inglês daqui é tradução dos rótulos dele,
 * e os nomes fictícios (campanha, cena, câmera, faixa, arquivos) vão junto,
 * pra a maquete não parecer metade de outra língua. Os de gente (Kael, Mira,
 * Rafa) ficam como estão.
 */
const pt = {
  abas: {
    Cenas: {
      nome: "Cenas",
      sobre: "Mapas e fundos da campanha. A que está no ar não é a que você edita.",
    },
    Arquivos: {
      nome: "Arquivos",
      sobre: "Quadros e notas da campanha, na mesma árvore de pastas.",
    },
    Retratos: {
      nome: "Retratos",
      sobre: "Os recortes de rosto que a mesa vê quando alguém fala.",
    },
    Personagens: { nome: "Personagens", sobre: "Ficha, miniaturas e donos." },
    Biblioteca: { nome: "Biblioteca", sobre: "Imagens e arquivos da campanha." },
    Sons: {
      nome: "Sons",
      sobre: "Pads no teclado numérico, o que está tocando e o acervo.",
    },
    Camadas: { nome: "Camadas", sobre: "O que está na cena, em ordem de empilhamento." },
  } satisfies Record<NomeDeAba, { nome: string; sobre: string }>,
  ferramentas: {
    quadrado: {
      rotulo: "Quadrado",
      dica: "Arraste de canto a canto. Shift trava o quadrado.",
    },
    circulo: { rotulo: "Círculo", dica: "Arraste de canto a canto. Shift trava o círculo." },
    tracoLivre: {
      rotulo: "Traço livre",
      dica: "Contorna vértice a vértice. O clique no primeiro fecha.",
    },
    texto: {
      rotulo: "Texto",
      dica: "Escreve direto na cena, sem papel. Nasce só para você.",
    },
    ponto: { rotulo: "Ponto", dica: "Crava um ponto com nota e anexos. Só você vê." },
    postit: { rotulo: "Postit", dica: "Cola um papel com texto à vista. Só você vê." },
    luz: { rotulo: "Luz", dica: "Crava uma luz. Acende o escuro em volta dela." },
    regua: { rotulo: "Régua", dica: "Mede distância e área. Cada quadrado vale 1 m." },
  } satisfies Record<NomeDeFerramenta, { rotulo: string; dica: string }>,

  cenaAberta: "Taverna do Javali",
  cenaNoAr: "Estrada de Vent",
  cenas: [
    { nome: "Estrada de Vent", itens: "1 item · 0 áreas" },
    { nome: "Taverna do Javali", itens: "3 itens · 1 área" },
  ],
  /** As camadas trazem o tamanho em pixel, como no painel do aplicativo. */
  camadas: [
    { nome: "Kael", medida: "61 × 127" },
    { nome: "Mira", medida: "59 × 121 · 15°" },
    { nome: "Handout 03 - Carta do Barão.jpg", medida: "183 × 55" },
  ],
  pasta: "Taverna",
  imagens: ["Taverna - piso.png", "Handout 03 - Carta do Barão.jpg"],
  /** As câmeras da cena, as mesmas da `DemoCamera`. */
  cameras: ["Balcão", "Porão"] satisfies [string, string],
  faixa: "O Ídolo",
  postit:
    "Pagou a rodada com moeda que ninguém daqui reconheceu. Perguntar sobre o brasão gasto na face, se alguém pensar em olhar.",
  ponto: {
    titulo: "Mesa dos três calados",
    texto:
      "Não bebem. Um deles olha a porta a cada vez que ela abre. Se alguém sentar junto, o do meio levanta.",
    anexo: "Carta do Barão.jpg",
  },
  inventario: "Inventário (3) · Rafa",

  recolher: { titulo: "Recolher a coluna", detalhe: "Sai da frente do mapa." },
  tirarNota: { titulo: "Tirar esta nota da tela", detalhe: "O ponto continua no mapa." },
  anexar: "Anexar imagens",
  soVoce:
    "Só você vê este ponto. A janela do espectador e os celulares recebem apenas o que você transmitir.",
  noAr: {
    titulo: "No ar",
    detalhe: (noAr: string, cena: string) =>
      `A mesa está vendo "${noAr}". Você edita "${cena}" sem ninguém ver o rascunho.`,
  },
  colocarNoAr: {
    titulo: "Colocar no ar",
    detalhe: (cena: string) => `A mesa passa a ver "${cena}".`,
  },
  sairDoAr: { titulo: "Sair do ar", detalhe: "Tira a mesa do ar. Útil em intervalo." },
  entrar: {
    titulo: "Entrar na mesa",
    detalhe: "Abre o código e o QR para os celulares e para a janela do espectador.",
  },
  abrirEspectador: {
    titulo: "Abrir Espectador",
    detalhe: "A tela da mesa, nesta máquina ou em outra.",
  },
  subabas: ["Mapas", "Fundos"] satisfies [string, string],
  novoMapa: "Novo mapa",
  marcaNoAr: "· no ar",
  colocarCenaNoAr: (cena: string) => `Colocar ${cena} no ar`,
  ficha: "Ficha do personagem",
  pontos: {
    titulo: "Pontos de anotação",
    detalhe: "A lista dos pontos desta cena. Escolher um leva a vista até ele.",
  },
  areas: {
    titulo: "Áreas escondidas",
    detalhe: "As áreas desta cena. O olho de cada uma revela ou esconde.",
  },
  configuracoes: { titulo: "Configurações do mapa", detalhe: "O que vale para a cena inteira." },
  jogadores: {
    titulo: "Jogadores",
    detalhe: "4 de 4 na mesa agora. Escolha um para ver arquivos e notas.",
  },
  saquinho: {
    titulo: "Saquinho de dados",
    detalhe: "Os dados desta mesa. O do site, no canto da página, é este mesmo.",
  },
  selecionar: { titulo: "Selecionar", detalhe: "Ferramentas do palco. Clique para trocar." },
  novaCamera: {
    titulo: "Nova câmera",
    detalhe: "Nasce sobre a selecionada, ou sobre o que você vê, e já no ar.",
  },
  transmitir: { titulo: "Transmitir", detalhe: "A mesa passa a ver a câmera selecionada." },
  maisComandos: "Mais comandos da câmera",
  menosZoom: "Menos zoom",
  encaixar: "Encaixar tudo o que existe",
  maisZoom: "Mais zoom",
  novaPasta: "Nova pasta",
  importar: "Importar arquivos",
  adicionar: (nome: string) => `Adicionar ${nome} à cena`,
  emCena: "Em cena",
  ordem: "3 · frente no topo",
  esconder: "Esconder",
  travar: "Travar",
  remover: "Remover do mapa",
  pausar: "Pausar",
  repetindo: "Repetindo",
  silenciar: {
    titulo: "Silenciar",
    detalhe:
      "Silencia só esta tela. A janela do espectador e os celulares continuam ouvindo.",
  },
  tirarTrilha: "Tirar a trilha",
};

const en: typeof pt = {
  abas: {
    Cenas: {
      nome: "Scenes",
      sobre: "The campaign's maps and backdrops. The one on air isn't the one you edit.",
    },
    Arquivos: {
      nome: "Files",
      sobre: "The campaign's boards and notes, in the same folder tree.",
    },
    Retratos: {
      nome: "Portraits",
      sobre: "The face crops the table sees when someone speaks.",
    },
    Personagens: { nome: "Characters", sobre: "Sheets, minis and owners." },
    Biblioteca: { nome: "Library", sobre: "The campaign's images and files." },
    Sons: {
      nome: "Sounds",
      sobre: "Pads on the numpad, what's playing, and the collection.",
    },
    Camadas: { nome: "Layers", sobre: "What's in the scene, in stacking order." },
  },
  ferramentas: {
    quadrado: {
      rotulo: "Square",
      dica: "Drag from corner to corner. Shift keeps it square.",
    },
    circulo: { rotulo: "Circle", dica: "Drag from corner to corner. Shift keeps it round." },
    tracoLivre: {
      rotulo: "Freeform",
      dica: "Trace it point by point. Clicking the first point closes it.",
    },
    texto: {
      rotulo: "Text",
      dica: "Writes straight onto the scene, no paper. Starts out visible only to you.",
    },
    ponto: { rotulo: "Pin", dica: "Drops a pin with a note and attachments. Only you see it." },
    postit: {
      rotulo: "Sticky note",
      dica: "Sticks up a note with its text showing. Only you see it.",
    },
    luz: { rotulo: "Light", dica: "Places a light. It brightens the dark around it." },
    regua: { rotulo: "Ruler", dica: "Measures distance and area. Each square is 1 m." },
  },

  cenaAberta: "The Boar's Tavern",
  cenaNoAr: "Vent Road",
  cenas: [
    { nome: "Vent Road", itens: "1 item · 0 areas" },
    { nome: "The Boar's Tavern", itens: "3 items · 1 area" },
  ],
  camadas: [
    { nome: "Kael", medida: "61 × 127" },
    { nome: "Mira", medida: "59 × 121 · 15°" },
    { nome: "Handout 03 - Baron's Letter.jpg", medida: "183 × 55" },
  ],
  pasta: "Tavern",
  imagens: ["Tavern - floor.png", "Handout 03 - Baron's Letter.jpg"],
  cameras: ["Bar", "Cellar"],
  faixa: "The Idol",
  postit:
    "Paid for the round with a coin nobody here recognized. Ask about the worn crest on its face, if anyone thinks to look.",
  ponto: {
    titulo: "The silent three's table",
    texto:
      "They don't drink. One of them looks at the door every time it opens. If someone sits with them, the one in the middle gets up.",
    anexo: "Baron's Letter.jpg",
  },
  inventario: "Inventory (3) · Rafa",

  recolher: { titulo: "Collapse the column", detalhe: "Gets it out of the map's way." },
  tirarNota: { titulo: "Take this note off the screen", detalhe: "The pin stays on the map." },
  anexar: "Attach images",
  soVoce:
    "Only you see this pin. The spectator window and the phones only get what you put on air.",
  noAr: {
    titulo: "On air",
    detalhe: (noAr, cena) =>
      `The table is watching "${noAr}". You edit "${cena}" without anyone seeing the draft.`,
  },
  colocarNoAr: {
    titulo: "Put on air",
    detalhe: (cena) => `The table switches to "${cena}".`,
  },
  sairDoAr: { titulo: "Take off air", detalhe: "Takes the table off air. Handy during breaks." },
  entrar: {
    titulo: "Join the table",
    detalhe: "Opens the code and the QR for the phones and the spectator window.",
  },
  abrirEspectador: {
    titulo: "Open Spectator",
    detalhe: "The table's screen, on this machine or another one.",
  },
  subabas: ["Maps", "Backdrops"],
  novoMapa: "New map",
  marcaNoAr: "· on air",
  colocarCenaNoAr: (cena) => `Put ${cena} on air`,
  ficha: "Character sheet",
  pontos: {
    titulo: "Note pins",
    detalhe: "This scene's pins. Picking one takes the view to it.",
  },
  areas: {
    titulo: "Hidden areas",
    detalhe: "This scene's areas. The eye on each one reveals or hides it.",
  },
  configuracoes: { titulo: "Map settings", detalhe: "What applies to the whole scene." },
  jogadores: {
    titulo: "Players",
    detalhe: "4 of 4 at the table right now. Pick one to see their files and notes.",
  },
  saquinho: {
    titulo: "Dice bag",
    detalhe: "This table's dice. The one in the corner of this page is the same one.",
  },
  selecionar: { titulo: "Select", detalhe: "Stage tools. Click to switch." },
  novaCamera: {
    titulo: "New camera",
    detalhe: "Starts over the selected one, or over what you're looking at, already on air.",
  },
  transmitir: { titulo: "Put on air", detalhe: "The table switches to the selected camera." },
  maisComandos: "More camera commands",
  menosZoom: "Zoom out",
  encaixar: "Fit everything",
  maisZoom: "Zoom in",
  novaPasta: "New folder",
  importar: "Import files",
  adicionar: (nome) => `Add ${nome} to the scene`,
  emCena: "In scene",
  ordem: "3 · front on top",
  esconder: "Hide",
  travar: "Lock",
  remover: "Remove from map",
  pausar: "Pause",
  repetindo: "Looping",
  silenciar: {
    titulo: "Mute",
    detalhe: "Mutes only this screen. The spectator window and the phones keep hearing it.",
  },
  tirarTrilha: "Remove the music",
};

const TEXTO = { pt, en };

/**
 * As barras da onda do tocador.
 *
 * Fórmula, e não sorteio: o componente é de servidor e o desenho tem que sair
 * igual em toda renderização — uma onda que muda a cada build viraria ruído
 * diferente em cada deploy.
 */
const ONDA = Array.from({ length: 170 }, (_, i) =>
  Math.round(
    16 +
      Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.37) + Math.sin(i * 0.11) * 0.45) * 78,
  ),
);

/** Quanto da faixa já tocou, em barras: 0:14 de 5:31. */
const TOCADO = 8;

type Lado = "cima" | "baixo" | "direita" | "esquerda";

/**
 * Dica no hover, em CSS puro: `group-hover` numa camada escondida. Sem estado e
 * sem JS, então a demo continua sendo componente de servidor.
 *
 * `lado` existe porque a moldura corta o que passa dela: perto do topo a dica
 * tem que abrir pra baixo, senão some. As réguas das bordas abrem para dentro
 * do palco, como no aplicativo.
 */
function Dica({
  titulo,
  detalhe,
  lado = "cima",
  alinhar = "centro",
  children,
}: {
  titulo: string;
  detalhe?: string;
  lado?: Lado;
  /**
   * Por qual borda a dica se pendura, quando ela abre em cima ou embaixo.
   * Centrada ela vaza dos dois lados, e numa coluna de 176px isso é mais largo
   * que a própria coluna: a metade que passa da borda é cortada pela moldura
   * da janela.
   */
  alinhar?: "centro" | "esquerda" | "direita";
  children: React.ReactNode;
}) {
  const eixoX = {
    centro: "left-1/2 -translate-x-1/2",
    esquerda: "left-0",
    direita: "right-0",
  }[alinhar];

  const posicao = {
    cima: `bottom-full mb-1.5 ${eixoX}`,
    baixo: `top-full mt-1.5 ${eixoX}`,
    direita: "top-1/2 left-full ml-1.5 -translate-y-1/2",
    esquerda: "top-1/2 right-full mr-1.5 -translate-y-1/2",
  }[lado];

  return (
    <span className="group/dica relative inline-flex">
      {children}
      <span
        className={`pointer-events-none absolute z-40 hidden w-max max-w-44 rounded-md border border-border bg-background px-2 py-1.5 text-left shadow-lg shadow-black/60 group-hover/dica:block ${posicao}`}
      >
        <span className="block font-mono text-foreground">{titulo}</span>
        {detalhe ? (
          <span className="mt-0.5 block leading-snug text-muted-foreground">
            {detalhe}
          </span>
        ) : null}
      </span>
    </span>
  );
}

function Pilula({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-0.5 rounded-lg border border-border bg-background/85 p-1 backdrop-blur">
      {children}
    </div>
  );
}

/**
 * A tira de abas de um grupo do dock.
 *
 * O estilo sai do `dock-group.tsx`: aba de editor, e não pastilha. Os cantos de
 * cima são arredondados, a borda tem três lados, e a ativa desce um pixel
 * (`-mb-px`) pra tapar a linha que separa a tira do corpo — é esse pixel que
 * faz a aba e o painel que ela abre lerem como a mesma superfície. O fundo da
 * ativa é opaco pelo mesmo motivo: translúcido, a linha apareceria atravessando
 * a aba.
 *
 * Tudo se alinha por baixo (`items-end`), inclusive os dois botões da ponta.
 *
 * A única liberdade é o nome das inativas quando o grupo tem mais de duas abas:
 * a coluna do aplicativo tem 288px e as quatro da esquerda ocupam quase isso; a
 * desta ilustração tem pouco mais da metade, porque a janela inteira foi
 * reduzida junto. Aí só a ativa fica escrita e as outras ficam no ícone, com o
 * nome na dica — reticências diriam menos do que o desenho.
 */
function TiraDeAbas({
  idioma,
  abas,
  ativa,
  encolher,
}: {
  idioma: Idioma;
  abas: NomeDeAba[];
  ativa: NomeDeAba;
  /** De que lado fica o botão que recolhe a coluna, quando o grupo tem um. */
  encolher?: "esquerda" | "direita";
}) {
  const t = TEXTO[idioma];
  const Encolher = encolher === "direita" ? PanelRightClose : PanelLeftClose;
  const escritas = abas.length <= 2;

  const botao = encolher ? (
    <Dica
      titulo={t.recolher.titulo}
      detalhe={t.recolher.detalhe}
      lado="baixo"
      alinhar={encolher === "direita" ? "direita" : "esquerda"}
    >
      <Encolher
        className="mb-1.5 size-3 shrink-0 text-muted-foreground"
        strokeWidth={1.75}
      />
    </Dica>
  ) : null;

  return (
    <div className="flex items-end gap-1 border-b border-border px-1.5 pt-1.5">
      {encolher === "direita" ? botao : null}

      <div className="flex min-w-0 flex-1 items-end gap-px">
        {abas.map((aba) => {
          const Icone = ABAS[aba];
          const { nome, sobre } = t.abas[aba];
          const selecionada = aba === ativa;

          return (
            <Dica key={aba} titulo={nome} detalhe={sobre} lado="baixo" alinhar="esquerda">
              <span
                className={`flex items-center gap-1.5 rounded-t-md border border-b-0 px-2 py-1 whitespace-nowrap ${
                  selecionada
                    ? "relative z-10 -mb-px border-border bg-muted text-foreground"
                    : "border-transparent text-muted-foreground"
                }`}
              >
                <Icone className="size-3 shrink-0" strokeWidth={1.75} />
                {selecionada || escritas ? nome : null}
              </span>
            </Dica>
          );
        })}
      </div>

      <Plus
        className="mb-1.5 size-3 shrink-0 text-muted-foreground"
        strokeWidth={1.75}
      />
      {encolher === "esquerda" ? botao : null}
    </div>
  );
}

/** O botão redondo de contorno que abre os painéis do aplicativo. */
function BotaoRedondo({
  icone: Icone,
  titulo,
  detalhe,
}: {
  icone: LucideIcon;
  titulo: string;
  detalhe?: string;
}) {
  return (
    <Dica titulo={titulo} detalhe={detalhe} lado="baixo" alinhar="direita">
      <span className="grid size-5 place-items-center rounded-full border border-border text-muted-foreground">
        <Icone className="size-2.5" strokeWidth={1.75} />
      </span>
    </Dica>
  );
}

/** As subabas de um painel, como Mapas e Fundos nas Cenas. */
function SubAbas({ opcoes, ativa }: { opcoes: string[]; ativa: string }) {
  return (
    <span className="flex items-center rounded-md border border-border p-0.5">
      {opcoes.map((opcao) => (
        <span
          key={opcao}
          className={`rounded px-1.5 py-0.5 ${
            opcao === ativa ? "bg-muted text-foreground" : "text-muted-foreground"
          }`}
        >
          {opcao}
        </span>
      ))}
    </span>
  );
}

/** Uma régua vertical de ferramentas, presa a uma das bordas do palco. */
function Regua({
  idioma,
  grupos,
  lado,
}: {
  idioma: Idioma;
  grupos: NomeDeFerramenta[][];
  lado: "direita" | "esquerda";
}) {
  const t = TEXTO[idioma];

  return (
    <div className="flex flex-col items-center gap-0.5 rounded-lg border border-border bg-background/85 p-1 backdrop-blur">
      {grupos.map((grupo, indice) => (
        <Fragment key={grupo[0]}>
          {indice > 0 ? <span className="my-0.5 h-px w-3 bg-border" /> : null}
          {grupo.map((ferramenta) => {
            const Icone = FERRAMENTAS[ferramenta];
            const { rotulo, dica } = t.ferramentas[ferramenta];

            return (
              <Dica key={ferramenta} titulo={rotulo} detalhe={dica} lado={lado}>
                <span className="p-1 text-muted-foreground">
                  <Icone className="size-3" strokeWidth={1.75} />
                </span>
              </Dica>
            );
          })}
        </Fragment>
      ))}
    </div>
  );
}

/** Miniatura de mapa: um retângulo com um cômodo dentro, só pra ler como mapa. */
function Miniatura({ className = "" }: { className?: string }) {
  return (
    <span
      className={`block shrink-0 overflow-hidden rounded-sm border border-border ${className}`}
    >
      <svg viewBox="0 0 40 26" className="size-full" aria-hidden>
        <rect width="40" height="26" fill="oklch(0.17 0 0)" />
        <path
          d="M7,6 H31 L34,10 V20 H23 L20,23 H10 L7,19 Z"
          fill="oklch(0.24 0.02 60)"
          stroke="var(--foreground)"
          strokeOpacity={0.25}
          strokeWidth={0.8}
        />
        <circle cx="16" cy="14" r="5" fill="var(--accent)" fillOpacity={0.18} />
      </svg>
    </span>
  );
}

/**
 * A moldura das janelas flutuantes: a mesma tira de título, com recolher,
 * fechar e a alça de redimensionar no canto.
 */
function JanelaFlutuante({
  icone: Icone,
  titulo,
  subtitulo,
  className = "",
  children,
}: {
  icone: LucideIcon;
  titulo: string;
  subtitulo: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`absolute z-20 overflow-hidden rounded-lg border border-border bg-background shadow-xl shadow-black/60 ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-border px-1.5 py-1">
        <Icone className="size-3 shrink-0 text-muted-foreground" strokeWidth={1.75} />
        <span className="min-w-0 flex-1">
          <span className="block truncate font-medium text-foreground">{titulo}</span>
          <span className="block truncate text-[9px] text-muted-foreground">
            {subtitulo}
          </span>
        </span>
        <ChevronUp className="size-3 shrink-0 text-muted-foreground" strokeWidth={1.75} />
        <X className="size-3 shrink-0 text-muted-foreground" strokeWidth={1.75} />
      </div>

      {children}

      {/* A alça: duas bordas no canto, como no `inner-window.tsx`. */}
      <span className="absolute right-0.5 bottom-0.5 size-2 border-r-2 border-b-2 border-muted-foreground/40" />
    </div>
  );
}

/** O papel colado no mapa. Só o mestre vê. */
function Postit({ idioma }: { idioma: Idioma }) {
  return (
    <div className="absolute top-[13%] left-[7%] z-10 w-[29%] rounded-sm bg-[#f4e9a8] p-2 text-[#3b3520] shadow-lg shadow-black/50">
      <p className="flex items-center gap-1 font-medium underline">
        <Link className="size-2.5" strokeWidth={2} />
        Kael
      </p>
      <p className="mt-1.5 leading-relaxed opacity-75">{TEXTO[idioma].postit}</p>
    </div>
  );
}

/**
 * O ponto cravado no mapa e a nota dele, ligados pelo fio.
 *
 * O fio existe no aplicativo (`pin-tethers.tsx`) porque a nota é arrastável e
 * acaba longe do ponto que explica; sem ele, duas coisas soltas na tela.
 */
function PontoComNota({ idioma }: { idioma: Idioma }) {
  const t = TEXTO[idioma];

  return (
    <>
      <span className="absolute top-[46%] left-[30%] z-10 grid size-4 place-items-center rounded-full border border-accent/60 bg-background/90 font-mono text-[9px] text-accent">
        1
      </span>

      <svg
        className="pointer-events-none absolute inset-0 z-10 size-full"
        aria-hidden
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <path
          d="M31,47 C40,42 48,32 57,26"
          fill="none"
          stroke="var(--accent)"
          strokeOpacity={0.5}
          strokeWidth={0.4}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="absolute top-[10%] right-[8%] z-20 w-[35%] overflow-hidden rounded-lg border border-border bg-background shadow-xl shadow-black/60">
        <div className="flex items-center gap-1.5 border-b border-border px-1.5 py-1">
          <span className="grid size-3.5 shrink-0 place-items-center rounded-full border border-accent/60 font-mono text-[8px] text-accent">
            1
          </span>
          <span className="min-w-0 flex-1 truncate text-foreground">
            {t.ponto.titulo}
          </span>
          <Dica titulo={t.tirarNota.titulo} detalhe={t.tirarNota.detalhe} lado="baixo">
            <ChevronUp className="size-3 text-muted-foreground" strokeWidth={1.75} />
          </Dica>
          <Trash2 className="size-3 shrink-0 text-muted-foreground" strokeWidth={1.75} />
        </div>

        <p className="px-1.5 py-1.5 leading-relaxed text-muted-foreground">
          {t.ponto.texto}
        </p>

        <div className="mx-1.5 mb-1 flex items-center gap-1.5 rounded-md border border-border px-1.5 py-1">
          <Miniatura className="h-4 w-6" />
          <span className="min-w-0 flex-1 truncate text-muted-foreground">
            {t.ponto.anexo}
          </span>
          <X className="size-2.5 shrink-0 text-muted-foreground" strokeWidth={1.75} />
        </div>

        <div className="mx-1.5 mb-1 flex items-center justify-center gap-1.5 rounded-md border border-border py-1 text-muted-foreground">
          <Paperclip className="size-2.5" strokeWidth={1.75} />
          {t.anexar}
        </div>

        <p className="px-1.5 pb-1.5 leading-snug text-muted-foreground/70">
          {t.soVoce}
        </p>
      </div>
    </>
  );
}

/**
 * A câmera selecionada, sobre o mapa.
 *
 * É o recorte que a janela do espectador recebe quando a câmera vai ao ar: o
 * mestre pode estar olhando outro canto do mapa sem mover o que a mesa vê. O
 * nome fica dentro da moldura, no canto, como no aplicativo.
 */
function Camera({ idioma }: { idioma: Idioma }) {
  const alca = "absolute size-1.5 border border-foreground/70 bg-background";

  return (
    <div className="absolute top-[40%] left-[36%] z-10 h-[34%] w-[30%]">
      <span className="absolute inset-0 border border-foreground/60" />
      <span className="absolute top-1 left-1 rounded border border-border bg-background/90 px-1 py-0.5 font-mono text-[9px] text-foreground">
        {TEXTO[idioma].cameras[0]}
      </span>
      <span className={`${alca} -top-[3px] -left-[3px]`} />
      <span className={`${alca} -top-[3px] -right-[3px]`} />
      <span className={`${alca} -bottom-[3px] -left-[3px]`} />
      <span className={`${alca} -right-[3px] -bottom-[3px]`} />
    </div>
  );
}

export function DemoMestre({
  idioma,
  cena = TEXTO[idioma].cenaAberta,
  noAr = TEXTO[idioma].cenaNoAr,
}: {
  idioma: Idioma;
  /** A cena aberta no palco. */
  cena?: string;
  /** A que a mesa está vendo. */
  noAr?: string;
}) {
  const t = TEXTO[idioma];
  const divisor = <span className="mx-0.5 h-3 w-px bg-border" />;

  return (
    <div className="flex aspect-16/9 min-w-240 flex-col bg-background text-[10px] select-none">
      {/* O cabeçalho da sessão: o que está no ar, e por onde a mesa entra. */}
      <header className="flex items-center gap-2 border-b border-border px-3 py-1.5">
        <Dica
          titulo={t.noAr.titulo}
          detalhe={t.noAr.detalhe(noAr, cena)}
          lado="baixo"
          alinhar="esquerda"
        >
          <span className="flex items-center gap-1.5 rounded border border-border bg-muted/60 px-1.5 py-1">
            <span className="size-1.5 rounded-full bg-[oklch(0.62_0.19_25)] shadow-[0_0_6px_oklch(0.62_0.19_25)]" />
            <span className="text-foreground">{noAr}</span>
          </span>
        </Dica>
        <Dica
          titulo={t.colocarNoAr.titulo}
          detalhe={t.colocarNoAr.detalhe(cena)}
          lado="baixo"
          alinhar="esquerda"
        >
          <span className="flex items-center gap-1 rounded border border-border px-1.5 py-1 text-muted-foreground">
            <Radio className="size-3" strokeWidth={1.75} />
            {t.colocarNoAr.titulo}
          </span>
        </Dica>
        <Dica titulo={t.sairDoAr.titulo} detalhe={t.sairDoAr.detalhe} lado="baixo">
          <span className="grid size-5 place-items-center rounded border border-border text-muted-foreground">
            <Square className="size-2.5" strokeWidth={1.75} />
          </span>
        </Dica>

        <span className="ml-auto flex items-center gap-2 text-muted-foreground">
          <Dica titulo={t.entrar.titulo} detalhe={t.entrar.detalhe} lado="baixo">
            <span className="flex items-center gap-1 rounded px-1.5 py-1">
              <QrCode className="size-3" strokeWidth={1.75} />
              {t.entrar.titulo}
            </span>
          </Dica>
          <Dica
            titulo={t.abrirEspectador.titulo}
            detalhe={t.abrirEspectador.detalhe}
            lado="baixo"
            alinhar="direita"
          >
            <span className="flex items-center gap-1 rounded border border-border px-1.5 py-1">
              <ExternalLink className="size-3" strokeWidth={1.75} />
              {t.abrirEspectador.titulo}
            </span>
          </Dica>
        </span>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* Coluna esquerda: um grupo só, com as quatro abas do que existe na
            sessão. É o layout de fábrica do dock. */}
        <aside className="flex w-44 shrink-0 flex-col border-r border-border">
          <TiraDeAbas
            idioma={idioma}
            abas={["Cenas", "Arquivos", "Retratos", "Personagens"]}
            ativa="Cenas"
            encolher="esquerda"
          />
          <div className="flex items-center gap-1 px-1.5 pt-1.5">
            <SubAbas opcoes={t.subabas} ativa={t.subabas[0]} />
            <span className="ml-auto">
              <BotaoRedondo icone={Plus} titulo={t.novoMapa} />
            </span>
          </div>

          <ul className="mt-1.5 flex flex-col">
            {t.cenas.map(({ nome, itens }) => {
              const estaNoAr = nome === noAr;
              const editando = nome === cena;

              return (
                <li
                  key={nome}
                  className={`flex items-center gap-1 px-1 py-1.5 ${editando ? "bg-muted/60" : ""}`}
                >
                  <GripVertical
                    className="size-3 shrink-0 text-muted-foreground/50"
                    strokeWidth={1.75}
                  />
                  <span className="relative shrink-0">
                    <Miniatura className="h-6 w-10" />
                    {estaNoAr ? (
                      <span className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-[oklch(0.62_0.19_25)]" />
                    ) : null}
                  </span>
                  <span className="min-w-0 flex-1">
                    {/* O nome encolhe primeiro: o "no ar" é o que a linha tem
                        de mais importante, e não pode ser o que some. */}
                    <span className="flex min-w-0 items-baseline gap-1">
                      <span
                        className={`min-w-0 truncate ${editando ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        {nome}
                      </span>
                      {estaNoAr ? (
                        <span className="shrink-0 text-[oklch(0.62_0.19_25)]">{t.marcaNoAr}</span>
                      ) : null}
                    </span>
                    <span className="block truncate text-muted-foreground/70">{itens}</span>
                  </span>
                  {estaNoAr ? null : (
                    <Dica titulo={t.colocarCenaNoAr(nome)} lado="baixo" alinhar="direita">
                      <Radio className="size-3 shrink-0 text-muted-foreground" strokeWidth={1.75} />
                    </Dica>
                  )}
                  <EllipsisVertical
                    className="size-3 shrink-0 text-muted-foreground"
                    strokeWidth={1.75}
                  />
                </li>
              );
            })}
          </ul>
        </aside>

        {/* O palco. O aplicativo desenha a cena dentro de uma margem, e não
            colada nas colunas: é ela que deixa ver onde o mapa acaba. */}
        <main className="relative min-w-0 flex-1 bg-[oklch(0.115_0_0)] p-3">
          <div className="relative size-full overflow-hidden rounded-md border border-border/60">
            <Palco />
            <Camera idioma={idioma} />
            <Postit idioma={idioma} />
            <PontoComNota idioma={idioma} />

            <JanelaFlutuante
              icone={ScrollText}
              titulo="Kael"
              subtitulo={t.ficha}
              className="bottom-[16%] left-[7%] w-[30%]"
            >
              <div className="flex gap-1.5 p-1.5">
                <span className="grid size-10 shrink-0 place-items-center rounded border border-border bg-muted font-mono text-muted-foreground">
                  K
                </span>
                <span className="flex min-w-0 flex-1 flex-col justify-center gap-1">
                  <span className="block h-px w-full bg-foreground/25" />
                  <span className="block h-px w-4/5 bg-foreground/20" />
                  <span className="block h-px w-full bg-foreground/20" />
                  <span className="block h-px w-2/3 bg-foreground/20" />
                </span>
              </div>
              <p className="px-1.5 pb-1.5 text-muted-foreground/70">{t.inventario}</p>
            </JanelaFlutuante>

            {/* No canto de cima, o que a cena tem: pontos e áreas escondidas.
                As áreas deixaram de ser aba e viraram esta contagem. */}
            <div className="absolute top-2 left-2 z-30 flex items-center gap-1.5">
              <Dica
                titulo={t.pontos.titulo}
                detalhe={t.pontos.detalhe}
                lado="baixo"
                alinhar="esquerda"
              >
                <Pilula>
                  <MapPin className="size-3 text-muted-foreground" strokeWidth={1.75} />
                  <span className="pr-1 font-mono text-muted-foreground">3</span>
                </Pilula>
              </Dica>
              <Dica
                titulo={t.areas.titulo}
                detalhe={t.areas.detalhe}
                lado="baixo"
                alinhar="esquerda"
              >
                <Pilula>
                  <EyeOff className="size-3 text-muted-foreground" strokeWidth={1.75} />
                  <span className="pr-1 font-mono text-muted-foreground">0/1</span>
                </Pilula>
              </Dica>
            </div>

            <div className="absolute top-2 right-2 z-30">
              <Pilula>
                <Dica
                  titulo={t.configuracoes.titulo}
                  detalhe={t.configuracoes.detalhe}
                  lado="baixo"
                  alinhar="direita"
                >
                  <span className="p-1 text-muted-foreground">
                    <Settings2 className="size-3" strokeWidth={1.75} />
                  </span>
                </Dica>
                {divisor}
                <Dica
                  titulo={t.jogadores.titulo}
                  detalhe={t.jogadores.detalhe}
                  lado="baixo"
                  alinhar="direita"
                >
                  <span className="flex items-center gap-1 px-1 text-muted-foreground">
                    <Users className="size-3" strokeWidth={1.75} />
                    <span className="font-mono">4</span>
                  </span>
                </Dica>
              </Pilula>
            </div>

            {/* As duas réguas das bordas: desenhar à esquerda, o que se crava
                no mapa à direita. */}
            <div className="absolute top-1/2 left-2 z-30 -translate-y-1/2">
              <Regua idioma={idioma} grupos={REGUA_DE_DESENHO} lado="direita" />
            </div>
            <div className="absolute top-1/2 right-2 z-30 -translate-y-1/2">
              <Regua idioma={idioma} grupos={REGUA_DO_MAPA} lado="esquerda" />
            </div>

            <div className="absolute right-[8%] bottom-[18%] z-30">
              <Dica
                titulo={t.saquinho.titulo}
                detalhe={t.saquinho.detalhe}
                alinhar="direita"
              >
                <span className="relative grid size-7 place-items-center rounded-full border border-border bg-background/85 text-muted-foreground backdrop-blur">
                  <Dices className="size-3.5" strokeWidth={1.75} />
                  <span className="absolute -top-1 -right-1 grid size-3.5 place-items-center rounded-full bg-accent font-mono text-[8px] text-background">
                    3
                  </span>
                </span>
              </Dica>
            </div>

            {/* As ferramentas do palco cabem num botão só, que abre para cima
                e mostra a que está na mão. */}
            <div className="absolute bottom-2 left-2 z-30">
              <Dica
                titulo={t.selecionar.titulo}
                detalhe={t.selecionar.detalhe}
                alinhar="esquerda"
              >
                <Pilula>
                  <span className="rounded bg-muted p-1 text-foreground">
                    <MousePointer2 className="size-3" strokeWidth={1.75} />
                  </span>
                </Pilula>
              </Dica>
            </div>

            {/* As câmeras da cena, ao lado do zoom: escolher uma e transmitir
                é o que muda o que a mesa vê. */}
            <div className="absolute right-2 bottom-2 z-30 flex items-center gap-1.5">
              <Pilula>
                <span className="flex items-center gap-1 rounded bg-foreground px-1.5 py-0.5 text-background">
                  <span className="font-mono opacity-60">1</span>
                  {t.cameras[0]}
                </span>
                <span className="flex items-center gap-1 px-1.5 py-0.5 text-muted-foreground">
                  <span className="font-mono">2</span>
                  {t.cameras[1]}
                </span>
                <Dica titulo={t.novaCamera.titulo} detalhe={t.novaCamera.detalhe}>
                  <span className="p-1 text-muted-foreground">
                    <Plus className="size-3" strokeWidth={1.75} />
                  </span>
                </Dica>
                {divisor}
                <Dica titulo={t.transmitir.titulo} detalhe={t.transmitir.detalhe}>
                  <span className="p-1 text-muted-foreground">
                    <Radio className="size-3" strokeWidth={1.75} />
                  </span>
                </Dica>
                <Dica titulo={t.maisComandos} alinhar="direita">
                  <span className="p-1 text-muted-foreground">
                    <EllipsisVertical className="size-3" strokeWidth={1.75} />
                  </span>
                </Dica>
              </Pilula>

              <Pilula>
                <Dica titulo={t.menosZoom}>
                  <span className="p-1 text-muted-foreground">
                    <Minus className="size-3" strokeWidth={1.75} />
                  </span>
                </Dica>
                <Dica titulo={t.encaixar}>
                  <span className="px-0.5 font-mono text-muted-foreground">152%</span>
                </Dica>
                <Dica titulo={t.maisZoom} alinhar="direita">
                  <span className="p-1 text-muted-foreground">
                    <Plus className="size-3" strokeWidth={1.75} />
                  </span>
                </Dica>
              </Pilula>
            </div>
          </div>
        </main>

        {/* Coluna direita: dois grupos empilhados, com o divisor arrastável no
            meio — as bibliotecas em cima, as camadas da cena embaixo. */}
        <aside className="flex w-44 shrink-0 flex-col border-l border-border">
          <div className="flex min-h-0 flex-[3] flex-col">
            <TiraDeAbas
              idioma={idioma}
              abas={["Biblioteca", "Sons"]}
              ativa="Biblioteca"
              encolher="direita"
            />
            <div className="flex items-center justify-end gap-1 px-1.5 pt-1.5">
              <BotaoRedondo icone={FolderPlus} titulo={t.novaPasta} />
              <BotaoRedondo icone={Upload} titulo={t.importar} />
            </div>
            <ul className="mt-1 flex flex-col">
              <li className="flex items-center gap-1.5 px-1.5 py-1">
                <ChevronDown className="size-2.5 shrink-0 text-muted-foreground" strokeWidth={1.75} />
                <FolderClosed className="size-3 shrink-0 text-muted-foreground" strokeWidth={1.75} />
                <span className="min-w-0 flex-1 truncate font-medium text-foreground">
                  {t.pasta}
                </span>
                <span className="font-mono text-muted-foreground/70">2</span>
                <EllipsisVertical className="size-3 shrink-0 text-muted-foreground" strokeWidth={1.75} />
              </li>
              {t.imagens.map((nome) => (
                <li key={nome} className="flex items-center gap-1.5 py-1 pr-1.5 pl-4">
                  <Miniatura className="h-5 w-7" />
                  <span className="min-w-0 flex-1 truncate text-foreground">{nome}</span>
                  <Dica titulo={t.adicionar(nome)} lado="baixo" alinhar="direita">
                    <Plus className="size-3 shrink-0 text-muted-foreground" strokeWidth={1.75} />
                  </Dica>
                  <EllipsisVertical className="size-3 shrink-0 text-muted-foreground" strokeWidth={1.75} />
                </li>
              ))}
            </ul>
          </div>

          {/* O divisor: no aplicativo ele arrasta e reparte a altura entre os
              dois grupos. */}
          <div className="flex h-1.5 shrink-0 items-center justify-center border-y border-border bg-muted/30">
            <span className="h-px w-5 bg-muted-foreground/40" />
          </div>

          <div className="flex min-h-0 flex-[2] flex-col">
            <TiraDeAbas idioma={idioma} abas={["Camadas"]} ativa="Camadas" />
            <p className="flex items-center gap-1.5 px-2 pt-1.5 pb-1">
              <span className="text-foreground">{t.emCena}</span>
              <span className="text-muted-foreground/70">{t.ordem}</span>
              <FolderPlus className="ml-auto size-3 text-muted-foreground" strokeWidth={1.75} />
            </p>
            <ul className="flex flex-col">
              {t.camadas.map(({ nome, medida }) => (
                <li key={nome} className="flex items-center gap-1.5 px-1.5 py-1">
                  <Miniatura className="size-5" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-foreground">{nome}</span>
                    <span className="block truncate text-muted-foreground/70">{medida}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1 text-muted-foreground">
                    <ChevronUp className="size-2.5" strokeWidth={1.75} />
                    <ChevronDown className="size-2.5" strokeWidth={1.75} />
                    {/* O olho e o cadeado juntos, na ordem do aplicativo. */}
                    <Dica titulo={t.esconder} lado="cima" alinhar="direita">
                      <Eye className="size-2.5" strokeWidth={1.75} />
                    </Dica>
                    <Dica titulo={t.travar} lado="cima" alinhar="direita">
                      <LockOpen className="size-2.5" strokeWidth={1.75} />
                    </Dica>
                    <Dica titulo={t.remover} lado="cima" alinhar="direita">
                      <Trash2 className="size-2.5" strokeWidth={1.75} />
                    </Dica>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* A trilha é da sessão, não da cena: trocar de cena não corta a música.
          A barra só existe com uma faixa escolhida — aqui, tocando. */}
      <footer className="flex items-center gap-2 border-t border-border px-2 py-1.5 text-muted-foreground">
        <Dica titulo={t.pausar} alinhar="esquerda">
          <span className="grid size-6 shrink-0 place-items-center rounded-full border border-border">
            <Pause className="size-3" strokeWidth={1.75} />
          </span>
        </Dica>
        <span className="shrink-0 font-mono text-foreground">{t.faixa}</span>
        <span className="shrink-0 font-mono">0:14</span>

        {/* A onda no lugar da barrinha: é por ela que se acha o ponto da faixa
            sem ter que ouvir até lá. */}
        <span className="flex h-5 min-w-0 flex-1 items-center justify-between">
          {ONDA.map((altura, indice) => (
            <span
              key={indice}
              className={`w-px shrink-0 rounded-full ${
                indice < TOCADO ? "bg-foreground/80" : "bg-foreground/25"
              }`}
              style={{ height: `${altura}%` }}
            />
          ))}
        </span>

        <span className="shrink-0 font-mono">5:31</span>
        <Dica titulo={t.repetindo}>
          <Repeat className="size-3 shrink-0" strokeWidth={1.75} />
        </Dica>
        <span className="flex h-px w-12 shrink-0 items-center bg-border">
          <span className="block h-px w-2/3 bg-foreground/50" />
        </span>
        <span className="w-4 shrink-0 font-mono">70</span>
        <Dica titulo={t.silenciar.titulo} detalhe={t.silenciar.detalhe} alinhar="direita">
          <Volume2 className="size-3 shrink-0" strokeWidth={1.75} />
        </Dica>
        <Dica titulo={t.tirarTrilha} alinhar="direita">
          <Square className="size-3 shrink-0" strokeWidth={1.75} />
        </Dica>
      </footer>
    </div>
  );
}
