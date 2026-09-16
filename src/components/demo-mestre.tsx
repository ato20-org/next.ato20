import {
  AudioLines,
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Dices,
  EllipsisVertical,
  Eraser,
  EyeOff,
  Frame,
  Grid3x3,
  GripVertical,
  Hand,
  Images,
  Layers,
  Link,
  LockOpen,
  MapPin,
  Maximize,
  Minus,
  MousePointer2,
  Music,
  Paperclip,
  PanelLeftClose,
  PanelRightClose,
  Pencil,
  PersonStanding,
  Plus,
  Repeat,
  Ruler,
  ScrollText,
  Square,
  SquareArrowOutUpRight,
  SquareDashedBottom,
  StickyNote,
  Trash2,
  Upload,
  Users,
  Volume2,
  X,
  type LucideIcon,
} from "lucide-react";

/**
 * Mockup da visão do mestre.
 *
 * É ilustração, não captura: o Mestre só roda dentro do aplicativo — ele checa
 * a marca do Tauri e recusa uma aba de navegador —, então não há como
 * fotografá-lo daqui.
 *
 * A estrutura não é inventada: ela copia o layout de fábrica do dock
 * (`use-layout-store.ts`), que é o que qualquer pessoa vê ao abrir o aplicativo
 * pela primeira vez — à esquerda um grupo com quatro abas, à direita dois
 * grupos empilhados, o palco no meio, o tocador no rodapé. Os rótulos, os
 * ícones e as dicas saem das telas correspondentes do aplicativo.
 *
 * Só os nomes de campanha, cena, camada, personagem e faixa são fictícios.
 */

/** Ícone de cada aba, como em `iconeDaJanela` do aplicativo. */
const ABAS = {
  Cenas: Clapperboard,
  Áreas: EyeOff,
  Retratos: PersonStanding,
  Personagens: Users,
  Imagens: Images,
  Sons: Music,
  Camadas: Layers,
} satisfies Record<string, LucideIcon>;

type NomeDeAba = keyof typeof ABAS;

/** O que cada aba guarda, pra dica que abre ao passar o mouse. */
const SOBRE: Record<NomeDeAba, string> = {
  Cenas: "As cenas da campanha. A que está no ar não é a que você edita.",
  Áreas: "As regiões cobertas da cena. A mesa vê preto sólido.",
  Retratos: "Os recortes de rosto que a mesa vê quando alguém fala.",
  Personagens: "Ficha, miniaturas e donos.",
  Imagens: "A biblioteca de mapas, fichas e retratos da campanha.",
  Sons: "As trilhas e efeitos da campanha.",
  Camadas: "O que está na cena, em ordem de empilhamento.",
};

/** Rótulo e dica saem do `mestre-toolbar.tsx` do aplicativo. */
const FERRAMENTAS = [
  {
    icone: MousePointer2,
    rotulo: "Selecionar",
    dica: "Clique para selecionar, arraste no vazio para marcar vários.",
    ativa: true,
  },
  {
    icone: Hand,
    rotulo: "Deslocar a cena",
    dica: "Arraste para percorrer o mapa. Segurar espaço faz o mesmo.",
    ativa: false,
  },
  {
    icone: SquareDashedBottom,
    rotulo: "Área escondida",
    dica: "Cobre uma região do mapa. A mesa vê preto sólido.",
    ativa: false,
  },
  {
    icone: MapPin,
    rotulo: "Ponto de anotação",
    dica: "Nota e anexos cravados no mapa. Só você vê — nem a TV nem os celulares recebem.",
    ativa: false,
  },
  {
    icone: StickyNote,
    rotulo: "Postit",
    dica: "Um papel com texto colado no mapa. Só você vê.",
    ativa: false,
  },
  {
    icone: Pencil,
    rotulo: "Lápis",
    dica: "Risca o mapa à mão livre. A mesa vê.",
    ativa: false,
  },
  {
    icone: Eraser,
    rotulo: "Borracha",
    dica: "Passe sobre um risco para apagá-lo inteiro. Ctrl+Z devolve.",
    ativa: false,
  },
];

const CENAS = [
  { nome: "Taverna do Javali", itens: "3 itens · 1 área", noAr: true },
  { nome: "Estrada de Vent", itens: "1 item · 0 áreas", noAr: false },
];

/** As camadas trazem o tamanho em pixel, como no painel do aplicativo. */
const CAMADAS = [
  { nome: "Kael", medida: "61 × 127" },
  { nome: "Mira", medida: "59 × 121 · 360°" },
  { nome: "Handout 03 - Carta do Barão.jpg", medida: "183 × 55" },
];

const IMAGENS = [
  { nome: "Taverna - piso.png", peso: "1.2 MB" },
  { nome: "Handout 03 - Carta do Barão.jpg", peso: "184 KB" },
];

/**
 * As barras da onda do tocador.
 *
 * Fórmula, e não sorteio: o componente é de servidor e o desenho tem que sair
 * igual em toda renderização — uma onda que muda a cada build viraria ruído
 * diferente em cada deploy.
 */
const ONDA = Array.from({ length: 190 }, (_, i) =>
  Math.round(
    16 +
      Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.37) + Math.sin(i * 0.11) * 0.45) * 78,
  ),
);

/** Quanto da faixa já tocou, em barras: 0:14 de 5:31. */
const TOCADO = 8;

/**
 * Dica no hover, em CSS puro: `group-hover` numa camada escondida. Sem estado e
 * sem JS, então a demo continua sendo componente de servidor.
 *
 * `lado` existe porque a moldura corta o que passa dela: perto do topo a dica
 * tem que abrir pra baixo, senão some.
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
  lado?: "cima" | "baixo";
  /**
   * Por qual borda a dica se pendura. Centrada ela vaza dos dois lados, e numa
   * coluna de 176px isso é mais largo que a própria coluna: a metade que passa
   * da borda é cortada pela moldura da janela.
   */
  alinhar?: "centro" | "esquerda" | "direita";
  children: React.ReactNode;
}) {
  const eixoX = {
    centro: "left-1/2 -translate-x-1/2",
    esquerda: "left-0",
    direita: "right-0",
  }[alinhar];

  return (
    <span className="group/dica relative inline-flex">
      {children}
      <span
        className={`pointer-events-none absolute z-40 hidden w-max max-w-44 rounded-md border border-border bg-background px-2 py-1.5 text-left shadow-lg shadow-black/60 group-hover/dica:block ${eixoX} ${
          lado === "cima" ? "bottom-full mb-1.5" : "top-full mt-1.5"
        }`}
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
  abas,
  ativa,
  encolher,
}: {
  abas: NomeDeAba[];
  ativa: NomeDeAba;
  /** De que lado fica o botão que recolhe a coluna, quando o grupo tem um. */
  encolher?: "esquerda" | "direita";
}) {
  const Encolher = encolher === "direita" ? PanelRightClose : PanelLeftClose;
  const escritas = abas.length <= 2;

  const botao = encolher ? (
    <Dica
      titulo="Recolher a coluna"
      detalhe="Sai da frente do mapa."
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
          const selecionada = aba === ativa;

          return (
            <Dica key={aba} titulo={aba} detalhe={SOBRE[aba]} lado="baixo" alinhar="esquerda">
              <span
                className={`flex items-center gap-1.5 rounded-t-md border border-b-0 px-2 py-1 whitespace-nowrap ${
                  selecionada
                    ? "relative z-10 -mb-px border-border bg-muted text-foreground"
                    : "border-transparent text-muted-foreground"
                }`}
              >
                <Icone className="size-3 shrink-0" strokeWidth={1.75} />
                {selecionada || escritas ? aba : null}
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

/** Botão largo, o mesmo em toda biblioteca. */
function BotaoLargo({ icone: Icone, rotulo }: { icone: LucideIcon; rotulo: string }) {
  return (
    <div className="mx-1.5 mt-1.5 flex items-center justify-center gap-1.5 rounded-md border border-border py-1.5 text-muted-foreground">
      <Icone className="size-3" strokeWidth={1.75} />
      {rotulo}
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

/** Mobília da taverna, em coordenadas do mapa. */
const MOVEIS = [
  { x: 74, y: 56, w: 52, h: 14 },
  { x: 152, y: 52, w: 30, h: 18 },
  { x: 268, y: 92, w: 16, h: 58 },
  { x: 92, y: 236, w: 58, h: 12 },
  { x: 230, y: 252, w: 40, h: 14 },
  { x: 68, y: 132, w: 14, h: 40 },
];

/**
 * Entulho espalhado pelo piso: pontos por fórmula, não por sorteio, pelo mesmo
 * motivo da onda do tocador — o desenho tem que sair igual em todo build.
 */
const ENTULHO = Array.from({ length: 26 }, (_, i) => ({
  x: 76 + ((i * 97) % 216),
  y: 62 + ((i * 151) % 190),
  r: 0.8 + ((i * 7) % 5) * 0.32,
}));

/** O palco: o mapa em si, sob os cartões e as pílulas de ferramenta. */
function Palco() {
  return (
    <svg
      viewBox="0 0 360 300"
      preserveAspectRatio="xMidYMid slice"
      className="size-full"
      aria-hidden
    >
      <defs>
        <pattern id="grade-demo" width="18" height="18" patternUnits="userSpaceOnUse">
          <path
            d="M18 0H0V18"
            fill="none"
            stroke="var(--foreground)"
            strokeOpacity={0.07}
            strokeWidth={0.6}
          />
        </pattern>
        <radialGradient id="luz-demo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.22} />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
        </radialGradient>
        <radialGradient id="sangue-demo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="oklch(0.4 0.19 25)" stopOpacity={0.7} />
          <stop offset="100%" stopColor="oklch(0.28 0.14 25)" stopOpacity={0} />
        </radialGradient>
        {/* A planta recorta tudo que é piso: sem isto as tábuas e o entulho
            passariam por cima da parede e o cômodo perderia o contorno. */}
        <clipPath id="piso-demo">
          <path d="M56,40 H286 L312,76 V246 H212 L186,274 H86 L56,238 Z" />
        </clipPath>
      </defs>

      <rect width="360" height="300" fill="oklch(0.105 0 0)" />

      {/* Planta da taverna: piso escuro, parede um tom acima. */}
      <path
        d="M56,40 H286 L312,76 V246 H212 L186,274 H86 L56,238 Z"
        fill="oklch(0.165 0.008 60)"
        stroke="oklch(0.3 0.022 68)"
        strokeWidth={3}
        strokeLinejoin="round"
      />

      <g clipPath="url(#piso-demo)">
        {/* Tábuas do assoalho. */}
        {Array.from({ length: 11 }, (_, i) => (
          <path
            key={i}
            d={`M50,${48 + i * 22} H320`}
            stroke="var(--foreground)"
            strokeOpacity={0.05}
            strokeWidth={0.8}
          />
        ))}

        <circle cx="128" cy="158" r="34" fill="url(#luz-demo)" />
        <circle cx="252" cy="210" r="26" fill="url(#luz-demo)" />
        <ellipse cx="170" cy="204" rx="30" ry="19" fill="url(#sangue-demo)" />

        {MOVEIS.map(({ x, y, w, h }) => (
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width={w}
            height={h}
            rx={1.5}
            fill="oklch(0.225 0.018 62)"
            stroke="oklch(0.32 0.025 68)"
            strokeWidth={0.8}
          />
        ))}

        {ENTULHO.map(({ x, y, r }, i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="var(--foreground)" fillOpacity={0.07} />
        ))}
      </g>

      <rect width="360" height="300" fill="url(#grade-demo)" />

      {/* Área escondida: a mesa vê preto sólido; o mestre vê a marcação. */}
      <g>
        <rect x="216" y="176" width="82" height="58" fill="oklch(0.06 0 0)" />
        <rect
          x="216"
          y="176"
          width="82"
          height="58"
          fill="none"
          stroke="var(--foreground)"
          strokeOpacity={0.35}
          strokeWidth={1}
          strokeDasharray="4 3"
        />
      </g>

      {/* Traço à mão livre. */}
      <path
        d="M84,262 C110,248 128,266 150,254 C168,244 180,260 200,252"
        fill="none"
        stroke="var(--foreground)"
        strokeOpacity={0.45}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
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
function Postit() {
  return (
    <div className="absolute top-[13%] left-[5%] z-10 w-[30%] rounded-sm bg-[#f4e9a8] p-2 text-[#3b3520] shadow-lg shadow-black/50">
      <p className="flex items-center gap-1 font-medium underline">
        <Link className="size-2.5" strokeWidth={2} />
        Kael
      </p>
      <p className="mt-1.5 leading-relaxed opacity-75">
        Pagou a rodada com moeda que ninguém daqui reconheceu. Perguntar sobre o
        brasão gasto na face, se alguém pensar em olhar.
      </p>
    </div>
  );
}

/**
 * O ponto cravado no mapa e a nota dele, ligados pelo fio.
 *
 * O fio existe no aplicativo (`pin-tethers.tsx`) porque a nota é arrastável e
 * acaba longe do ponto que explica; sem ele, duas coisas soltas na tela.
 */
function PontoComNota() {
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
          d="M31,47 C40,42 48,36 57,32"
          fill="none"
          stroke="var(--accent)"
          strokeOpacity={0.5}
          strokeWidth={0.4}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="absolute top-[27%] right-[4%] z-20 w-[38%] overflow-hidden rounded-lg border border-border bg-background shadow-xl shadow-black/60">
        <div className="flex items-center gap-1.5 border-b border-border px-1.5 py-1">
          <span className="grid size-3.5 shrink-0 place-items-center rounded-full border border-accent/60 font-mono text-[8px] text-accent">
            1
          </span>
          <span className="min-w-0 flex-1 truncate text-foreground">
            Mesa dos três calados
          </span>
          <Dica titulo="Tirar esta nota da tela" detalhe="O ponto continua no mapa." lado="baixo">
            <ChevronUp className="size-3 text-muted-foreground" strokeWidth={1.75} />
          </Dica>
          <Trash2 className="size-3 shrink-0 text-muted-foreground" strokeWidth={1.75} />
        </div>

        <p className="px-1.5 py-1.5 leading-relaxed text-muted-foreground">
          Não bebem. Um deles olha a porta a cada vez que ela abre. Se alguém
          sentar junto, o do meio levanta.
        </p>

        <div className="mx-1.5 mb-1 flex items-center gap-1.5 rounded-md border border-border px-1.5 py-1">
          <Miniatura className="h-4 w-6" />
          <span className="min-w-0 flex-1 truncate text-muted-foreground">
            Carta do Barão.jpg
          </span>
          <X className="size-2.5 shrink-0 text-muted-foreground" strokeWidth={1.75} />
        </div>

        <div className="mx-1.5 mb-1 flex items-center justify-center gap-1.5 rounded-md border border-border py-1 text-muted-foreground">
          <Paperclip className="size-2.5" strokeWidth={1.75} />
          Anexar imagens
        </div>

        <p className="px-1.5 pb-1.5 leading-snug text-muted-foreground/70">
          Só você vê este ponto. A TV e os celulares recebem apenas o que você
          transmitir.
        </p>
      </div>
    </>
  );
}

/**
 * O enquadramento que a mesa recebe.
 *
 * É o retângulo do "Enquadrar a mesa aqui": o mestre pode estar olhando outro
 * canto do mapa sem mover o que a TV mostra.
 */
function Camera() {
  const alca = "absolute size-1.5 border border-foreground/70 bg-background";

  return (
    <div className="absolute top-[40%] left-[36%] z-10 h-[34%] w-[30%]">
      <span className="absolute -top-4 left-0 rounded border border-border bg-background/90 px-1 py-0.5 font-mono text-[9px] text-foreground">
        câmera
      </span>
      <span className="absolute inset-0 border border-dashed border-foreground/40" />
      <span className={`${alca} -top-[3px] -left-[3px]`} />
      <span className={`${alca} -top-[3px] -right-[3px]`} />
      <span className={`${alca} -bottom-[3px] -left-[3px]`} />
      <span className={`${alca} -right-[3px] -bottom-[3px]`} />
    </div>
  );
}

export function DemoMestre({ cena = "Taverna do Javali" }: { cena?: string }) {
  return (
    <div className="flex aspect-16/9 min-w-240 flex-col bg-background text-[10px] select-none">
      {/* O cabeçalho da sessão: o que está no ar, e por onde a mesa entra. */}
      <header className="flex items-center gap-2 border-b border-border px-3 py-1.5">
        <Dica
          titulo="No ar"
          detalhe={`A mesa está vendo "${cena}". Você edita outra cena sem ninguém ver o rascunho.`}
          lado="baixo"
        >
          <span className="flex items-center gap-1.5 rounded border border-border bg-muted/60 px-1.5 py-1">
            <span className="size-1.5 rounded-full bg-[oklch(0.55_0.2_25)]" />
            <span className="text-foreground">{cena}</span>
          </span>
        </Dica>
        <Dica titulo="Sair do ar" detalhe="Tira a mesa do ar. Útil em intervalo." lado="baixo">
          <span className="grid size-5 place-items-center rounded border border-border text-muted-foreground">
            <Square className="size-2.5" strokeWidth={1.75} />
          </span>
        </Dica>

        <span className="ml-auto flex items-center gap-2 text-muted-foreground">
          <Dica
            titulo="Entrar na mesa"
            detalhe="Abre o código e o QR para os celulares e para a TV."
            lado="baixo"
          >
            <span className="flex items-center gap-1 rounded border border-border px-1.5 py-1">
              <Users className="size-3" strokeWidth={1.75} />
              Entrar na mesa
            </span>
          </Dica>
          <Dica
            titulo="Abrir Espectador"
            detalhe="A tela da mesa, nesta máquina ou em outra."
            lado="baixo"
          >
            <span className="flex items-center gap-1 rounded border border-border px-1.5 py-1">
              <SquareArrowOutUpRight className="size-3" strokeWidth={1.75} />
              Abrir Espectador
            </span>
          </Dica>
        </span>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* Coluna esquerda: um grupo só, com as quatro abas do que existe na
            sessão. É o layout de fábrica do dock. */}
        <aside className="flex w-44 shrink-0 flex-col border-r border-border">
          <TiraDeAbas
            abas={["Cenas", "Áreas", "Retratos", "Personagens"]}
            ativa="Cenas"
            encolher="esquerda"
          />
          <BotaoLargo icone={Plus} rotulo="Nova cena" />

          <ul className="mt-1.5 flex flex-col">
            {CENAS.map(({ nome, itens, noAr }) => (
              <li
                key={nome}
                className={`flex items-center gap-1.5 px-1.5 py-1.5 ${
                  noAr ? "bg-muted/60" : ""
                }`}
              >
                <Miniatura className="h-6 w-9" />
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline gap-1 truncate">
                    <span className={noAr ? "text-foreground" : "text-muted-foreground"}>
                      {nome}
                    </span>
                    {noAr ? (
                      <span className="shrink-0 text-[oklch(0.62_0.19_25)]">· no ar</span>
                    ) : null}
                  </span>
                  <span className="block truncate text-muted-foreground/70">{itens}</span>
                </span>
                <EllipsisVertical
                  className="size-3 shrink-0 text-muted-foreground"
                  strokeWidth={1.75}
                />
              </li>
            ))}
          </ul>
        </aside>

        {/* O palco. O aplicativo desenha a cena dentro de uma margem, e não
            colada nas colunas: é ela que deixa ver onde o mapa acaba. */}
        <main className="relative min-w-0 flex-1 bg-[oklch(0.115_0_0)] p-3">
          <div className="relative size-full overflow-hidden rounded-md border border-border/60">
            <Palco />
            <Camera />
            <Postit />
            <PontoComNota />

            <JanelaFlutuante
              icone={ScrollText}
              titulo="Kael"
              subtitulo="Ficha do personagem"
              className="bottom-[15%] left-[4%] w-[32%]"
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
              <p className="px-1.5 pb-1.5 text-muted-foreground/70">
                Inventário (3) · Rafa
              </p>
            </JanelaFlutuante>

            {/* Os pontos da cena, no canto de cima. */}
            <div className="absolute top-2 left-2 z-30">
              <Dica
                titulo="Pontos desta cena"
                detalhe="Leva a uma nota que pode estar fora do enquadramento."
                lado="baixo"
              >
                <Pilula>
                  <MapPin className="size-3 text-muted-foreground" strokeWidth={1.75} />
                  <span className="pr-1 font-mono text-muted-foreground">3</span>
                </Pilula>
              </Dica>
            </div>

            <div className="absolute top-2 right-2 z-30 flex flex-col items-end gap-2">
              <Pilula>
                <Dica
                  titulo="Jogadores"
                  detalhe="Quem entrou pelo celular, com o código da mesa."
                  lado="baixo"
                >
                  <span className="flex items-center gap-1 px-1 text-muted-foreground">
                    <Users className="size-3" strokeWidth={1.75} />
                    <span className="font-mono">4</span>
                  </span>
                </Dica>
                <Dica titulo="Rolagens" detalhe="O que a mesa rolou, na ordem." lado="baixo">
                  <span className="px-1 text-muted-foreground">
                    <Dices className="size-3" strokeWidth={1.75} />
                  </span>
                </Dica>
                <Dica titulo="Recolher a coluna" lado="baixo">
                  <span className="px-1 text-muted-foreground">
                    <PanelRightClose className="size-3" strokeWidth={1.75} />
                  </span>
                </Dica>
              </Pilula>

              <Dica
                titulo="Saquinho de dados"
                detalhe="Rola na tela, à vista da mesa. O do site, no canto da página, é este mesmo."
                lado="baixo"
              >
                <span className="relative grid size-7 place-items-center rounded-full border border-border bg-background/85 text-muted-foreground backdrop-blur">
                  <Dices className="size-3.5" strokeWidth={1.75} />
                  <span className="absolute -top-1 -right-1 grid size-3.5 place-items-center rounded-full bg-accent font-mono text-[8px] text-background">
                    3
                  </span>
                </span>
              </Dica>
            </div>

            {/* Ferramentas e enquadramento nas duas pontas, como no aplicativo. */}
            <div className="absolute bottom-2 left-2 z-30">
              <Pilula>
                {FERRAMENTAS.map(({ icone: Icone, rotulo, dica, ativa }) => (
                  <Dica key={rotulo} titulo={rotulo} detalhe={dica}>
                    <span
                      className={
                        ativa
                          ? "rounded bg-muted p-1 text-foreground"
                          : "p-1 text-muted-foreground"
                      }
                    >
                      <Icone className="size-3" strokeWidth={1.75} />
                    </span>
                  </Dica>
                ))}
              </Pilula>
            </div>

            <div className="absolute right-2 bottom-2 z-30">
              <Pilula>
                <Dica titulo="Menos zoom" alinhar="esquerda">
                  <span className="p-1 text-muted-foreground">
                    <Minus className="size-3" strokeWidth={1.75} />
                  </span>
                </Dica>
                <span className="px-0.5 font-mono text-muted-foreground">152%</span>
                <Dica titulo="Mais zoom">
                  <span className="p-1 text-muted-foreground">
                    <Plus className="size-3" strokeWidth={1.75} />
                  </span>
                </Dica>
                <Dica titulo="Grade" detalhe="Encaixa o que você arrasta nos quadrados.">
                  <span className="p-1 text-muted-foreground">
                    <Grid3x3 className="size-3" strokeWidth={1.75} />
                  </span>
                </Dica>
                <Dica titulo="Régua" detalhe="Mede sobre o mapa. A mesa acompanha a conta.">
                  <span className="p-1 text-muted-foreground">
                    <Ruler className="size-3" strokeWidth={1.75} />
                  </span>
                </Dica>
                <Dica titulo="Encaixar a cena inteira">
                  <span className="p-1 text-muted-foreground">
                    <Maximize className="size-3" strokeWidth={1.75} />
                  </span>
                </Dica>
                <Dica
                  titulo="Enquadrar a mesa aqui"
                  detalhe="A TV passa a mostrar exatamente este recorte."
                  alinhar="direita"
                >
                  <span className="p-1 text-muted-foreground">
                    <Frame className="size-3" strokeWidth={1.75} />
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
            <TiraDeAbas abas={["Imagens", "Sons"]} ativa="Imagens" encolher="direita" />
            <BotaoLargo icone={Upload} rotulo="Importar imagens" />
            <ul className="mt-1.5 flex flex-col">
              {IMAGENS.map(({ nome, peso }) => (
                <li key={nome} className="flex items-center gap-1.5 px-1.5 py-1">
                  <Miniatura className="h-5 w-7" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-foreground">{nome}</span>
                    <span className="block truncate text-muted-foreground/70">{peso}</span>
                  </span>
                  <Plus className="size-3 shrink-0 text-muted-foreground" strokeWidth={1.75} />
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
            <TiraDeAbas abas={["Camadas"]} ativa="Camadas" />
            <p className="flex items-baseline gap-1.5 px-2 pt-1.5 pb-1">
              <span className="text-foreground">Em cena</span>
              <span className="text-muted-foreground/70">3 · frente no topo</span>
            </p>
            <ul className="flex flex-col">
              {CAMADAS.map(({ nome, medida }) => (
                <li key={nome} className="flex items-center gap-1.5 px-1.5 py-1">
                  <GripVertical
                    className="size-3 shrink-0 text-muted-foreground/60"
                    strokeWidth={1.75}
                  />
                  <Miniatura className="size-5" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-foreground">{nome}</span>
                    <span className="block truncate text-muted-foreground/70">{medida}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1 text-muted-foreground">
                    <ChevronUp className="size-2.5" strokeWidth={1.75} />
                    <ChevronDown className="size-2.5" strokeWidth={1.75} />
                    <Dica titulo="Travar" lado="cima" alinhar="direita">
                      <LockOpen className="size-2.5" strokeWidth={1.75} />
                    </Dica>
                    <Dica titulo="Remover da cena" lado="cima" alinhar="direita">
                      <Trash2 className="size-2.5" strokeWidth={1.75} />
                    </Dica>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* A trilha é da sessão, não da cena: trocar de cena não corta a música. */}
      <footer className="flex items-center gap-2 border-t border-border px-2 py-1.5 text-muted-foreground">
        <Dica titulo="Retomar a trilha">
          <span className="grid size-6 shrink-0 place-items-center rounded-full border border-border">
            <AudioLines className="size-3" strokeWidth={1.75} />
          </span>
        </Dica>
        <span className="shrink-0 font-mono text-foreground">O Ídolo</span>
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
        <Dica titulo="Repetir a faixa">
          <Repeat className="size-3 shrink-0" strokeWidth={1.75} />
        </Dica>
        <span className="flex h-px w-12 shrink-0 items-center bg-border">
          <span className="block h-px w-2/3 bg-foreground/50" />
        </span>
        <Dica titulo="Volume" detalhe="Em todas as telas, não só nesta." alinhar="direita">
          <Volume2 className="size-3 shrink-0" strokeWidth={1.75} />
        </Dica>
      </footer>
    </div>
  );
}
