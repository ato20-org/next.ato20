import {
  AudioLines,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Dices,
  EllipsisVertical,
  Eraser,
  Expand,
  FileText,
  FolderPlus,
  Grid3x3,
  GripVertical,
  Hand,
  Image as ImagemIcone,
  Link,
  Lock,
  MapPin,
  Maximize,
  Minus,
  MousePointer2,
  PanelLeftClose,
  PanelRightClose,
  Pencil,
  Plus,
  Radio,
  Repeat,
  Ruler,
  Search,
  SquareArrowOutUpRight,
  SquareDashedBottom,
  Trash2,
  Upload,
  Users,
  Volume2,
} from "lucide-react";

/**
 * Mockup da visão do mestre.
 *
 * É ilustração, não captura: o Operador só roda dentro do aplicativo — ele
 * checa a marca do Tauri e recusa uma aba de navegador —, então não há como
 * fotografá-lo daqui. A estrutura segue a do app: barra de abas com a mesa no
 * ar, coluna de cenas com as camadas embaixo, palco com as ferramentas, coluna
 * de biblioteca em seções empilhadas e o tocador de trilha no rodapé.
 *
 * Os nomes de cena, camada, personagem, livro e faixa são fictícios.
 */

/** Rótulo e dica saem do `operator-toolbar.tsx` do app. */
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
    icone: FileText,
    rotulo: "Nota",
    dica: "Um bilhete aberto sobre o mapa, com links para a ficha e para o arquivo.",
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

/** O que cada seção da coluna guarda. */
const SECOES = {
  Cenas: "As cenas da campanha. A que está no ar não é a que você edita.",
  Imagens: "A biblioteca de mapas, fichas e retratos da campanha.",
  Camadas: "O que está na cena, em ordem de empilhamento.",
  Retratos: "Os recortes de rosto que a mesa vê quando alguém fala.",
  Personagens: "As fichas do elenco, cada uma amarrada a um jogador.",
  Estante: "Os livros da campanha, abertos na página em que você parou.",
  Sons: "As trilhas e efeitos da campanha.",
} as const;

const CENAS = [
  { nome: "Taverna do Javali", itens: "3 itens · 0 áreas", noAr: true },
  { nome: "Estrada de Vent", itens: "1 item · 0 áreas", noAr: false },
];

/** As camadas trazem o tamanho em pixel, como no painel do app. */
const CAMADAS = [
  { nome: "Kael", medida: "61 × 127" },
  { nome: "Mira", medida: "59 × 121 · 360°" },
  { nome: "Handout 03 - Carta do Barão.jpg", medida: "183 × 55" },
];

const PERSONAGENS = [
  { nome: "Kael", jogador: "Rafa" },
  { nome: "Mira", jogador: "Bia" },
];

const SONS = [
  { nome: "Trilha 02 - O Ídolo.mp3", peso: "9307 KB · trilha", trilha: true },
  { nome: "Trilha 01 - O Porão.mp3", peso: "9196 KB", trilha: false },
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
  children,
}: {
  titulo: string;
  detalhe?: string;
  lado?: "cima" | "baixo";
  children: React.ReactNode;
}) {
  return (
    <span className="group/dica relative inline-flex">
      {children}
      <span
        className={`pointer-events-none absolute left-1/2 z-30 hidden w-max max-w-52 -translate-x-1/2 rounded-md border border-border bg-background px-2 py-1.5 text-left shadow-lg shadow-black/60 group-hover/dica:block ${
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
    <div className="flex items-center gap-0.5 rounded-md border border-border bg-background/85 p-0.5 backdrop-blur">
      {children}
    </div>
  );
}

/**
 * Cabeçalho de seção: o nome da seção é o texto de busca do próprio painel.
 * No app cada coluna é uma pilha dessas caixas, e é essa repetição que dá o
 * ritmo da interface.
 */
function Cabecalho({
  nome,
  abas,
  painel,
}: {
  nome: keyof typeof SECOES;
  abas?: readonly (keyof typeof SECOES)[];
  /** De que lado fica o botão que encolhe a coluna, se ela tiver um. */
  painel?: "esquerda" | "direita";
}) {
  const lista = abas ?? [nome];
  const Encolher = painel === "direita" ? PanelRightClose : PanelLeftClose;

  const botao = painel ? (
    <Dica titulo="Encolher a coluna" detalhe="Sai da frente do mapa." lado="baixo">
      <Encolher className="size-3 shrink-0 text-muted-foreground" strokeWidth={1.75} />
    </Dica>
  ) : null;

  return (
    <div className="flex items-center gap-1 px-1.5 py-1">
      {painel === "direita" ? botao : null}
      <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-border px-1.5 py-1">
        {lista.map((aba, indice) => (
          <Dica key={aba} titulo={aba} detalhe={SECOES[aba]} lado="baixo">
            <span
              className={
                indice === 0 ? "text-foreground" : "text-muted-foreground"
              }
            >
              {aba}
            </span>
          </Dica>
        ))}
      </div>
      <Plus className="size-3 shrink-0 text-muted-foreground" strokeWidth={1.75} />
      {painel === "esquerda" ? botao : null}
    </div>
  );
}

/** Botão largo de importar, o mesmo em toda seção da biblioteca. */
function Importar({ icone: Icone, rotulo }: { icone: typeof Upload; rotulo: string }) {
  return (
    <div className="mx-1.5 flex items-center justify-center gap-1.5 rounded-md border border-border py-1.5 text-muted-foreground">
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
 * A ficha selecionada, com as alças de canto e o rótulo — é assim que o app
 * mostra o que está sob o cursor.
 */
function FichaSelecionada() {
  const alca =
    "absolute size-1.5 border border-foreground/70 bg-background";

  return (
    <div className="absolute top-[30%] left-[42%] h-[30%] w-[34%]">
      <span className="absolute -top-4 left-0 rounded border border-border bg-background/90 px-1 py-0.5 font-mono text-[9px] text-foreground">
        câmera
      </span>
      <span className="absolute inset-0 border border-dashed border-foreground/40" />

      {/* O retrato e a ficha que estão dentro da seleção. */}
      <span className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-stretch gap-px overflow-hidden rounded-sm border border-border">
        <span className="grid w-8 place-items-center bg-muted font-mono text-[9px] text-muted-foreground">
          K
        </span>
        <span className="flex w-24 flex-col justify-center gap-0.5 bg-background/90 px-1.5 py-1.5">
          <span className="block h-px w-full bg-foreground/25" />
          <span className="block h-px w-4/5 bg-foreground/20" />
          <span className="block h-px w-full bg-foreground/20" />
          <span className="block h-px w-2/3 bg-foreground/20" />
        </span>
      </span>

      <span className={`${alca} -top-[3px] -left-[3px]`} />
      <span className={`${alca} -top-[3px] -right-[3px]`} />
      <span className={`${alca} -bottom-[3px] -left-[3px]`} />
      <span className={`${alca} -right-[3px] -bottom-[3px]`} />
    </div>
  );
}

/** O bilhete preso no mapa: links para a ficha e para o arquivo, e o texto. */
function Nota() {
  return (
    <div className="absolute top-[6%] left-[4%] w-[38%] rounded-sm bg-[#f4e9a8] p-2 text-[#3b3520] shadow-lg shadow-black/50">
      <p className="flex items-center gap-1 font-medium underline">
        <Link className="size-2.5" strokeWidth={2} />
        Kael
      </p>
      <p className="mt-1.5 flex items-center gap-1 font-medium underline">
        <ImagemIcone className="size-2.5" strokeWidth={2} />
        Token - Kael.png
      </p>
      <p className="mt-2 leading-relaxed opacity-70">
        Pagou a primeira rodada com moeda que ninguém daqui reconheceu. O
        estalajadeiro guardou a moeda. Perguntar sobre o brasão gasto na face,
        se alguém pensar em olhar.
      </p>
    </div>
  );
}

export function DemoMestre({ cena = "Taverna do Javali" }: { cena?: string }) {
  return (
    <div className="flex aspect-16/9 min-w-240 flex-col bg-background text-[10px] select-none">
      {/* Barra de abas: cada mapa aberto é uma aba, e a bolinha marca a que a
          mesa está vendo. Editar outra aba não muda o que está no ar. */}
      <header className="flex items-center gap-2 border-b border-border px-2 py-1">
        <Dica
          titulo="No ar"
          detalhe="A cena que a mesa está vendo agora. Você edita outra sem ninguém ver o rascunho."
          lado="baixo"
        >
          <span className="flex items-center gap-1.5 rounded border border-border bg-muted/60 px-1.5 py-1">
            <span className="size-1.5 rounded-full bg-[oklch(0.55_0.2_25)]" />
            <span className="text-foreground">{cena}</span>
          </span>
        </Dica>
        <Dica titulo="Nova aba" detalhe="Outro mapa aberto ao lado deste." lado="baixo">
          <span className="grid size-4 place-items-center rounded-sm border border-border text-muted-foreground">
            <Plus className="size-2.5" strokeWidth={1.75} />
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
            titulo="Abrir Assistir"
            detalhe="A tela da mesa, nesta máquina ou em outra."
            lado="baixo"
          >
            <span className="flex items-center gap-1 rounded border border-border px-1.5 py-1">
              <SquareArrowOutUpRight className="size-3" strokeWidth={1.75} />
              Abrir Assistir
            </span>
          </Dica>
        </span>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* Coluna esquerda: as cenas em cima, o que está dentro da cena embaixo. */}
        <aside className="flex w-52 shrink-0 flex-col border-r border-border">
          <Cabecalho nome="Cenas" painel="esquerda" />
          <div className="mx-1.5 flex items-center justify-center gap-1.5 rounded-md border border-border py-1.5 text-muted-foreground">
            <Plus className="size-3" strokeWidth={1.75} />
            Nova cena
          </div>

          <ul className="mt-1 flex flex-col">
            {CENAS.map(({ nome, itens, noAr }) => (
              <li
                key={nome}
                className={`flex items-center gap-1.5 px-1.5 py-1.5 ${
                  noAr ? "bg-muted/60" : ""
                }`}
              >
                <GripVertical
                  className="size-3 shrink-0 text-muted-foreground/60"
                  strokeWidth={1.75}
                />
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
                {noAr ? null : (
                  <Radio className="size-3 shrink-0 text-muted-foreground" strokeWidth={1.75} />
                )}
                <EllipsisVertical
                  className="size-3 shrink-0 text-muted-foreground"
                  strokeWidth={1.75}
                />
              </li>
            ))}
          </ul>

          {/* Camadas descem pro pé da coluna: é a lista do que está na cena
              aberta, e não da campanha — no app ela fica junto do palco. */}
          <div className="mt-auto border-t border-border">
            <Cabecalho nome="Camadas" abas={["Camadas", "Retratos"]} />
            <p className="flex items-baseline gap-1.5 px-2 pb-1">
              <span className="text-foreground">Em cena</span>
              <span className="text-muted-foreground/70">3 · frente no topo</span>
            </p>
            <ul className="flex flex-col pb-1">
              {CAMADAS.map(({ nome, medida }) => (
                <li key={nome} className="flex items-center gap-1.5 px-1.5 py-1">
                  <GripVertical
                    className="size-3 shrink-0 text-muted-foreground/60"
                    strokeWidth={1.75}
                  />
                  <Miniatura className="size-5" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-foreground">{nome}</span>
                    <span className="block truncate text-muted-foreground/70">
                      {medida}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1 text-muted-foreground">
                    <ChevronUp className="size-2.5" strokeWidth={1.75} />
                    <ChevronDown className="size-2.5" strokeWidth={1.75} />
                    <Lock className="size-2.5" strokeWidth={1.75} />
                    <Trash2 className="size-2.5" strokeWidth={1.75} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Palco. */}
        <main className="relative min-w-0 flex-1 overflow-hidden">
          <Palco />
          <Nota />
          <FichaSelecionada />

          <div className="absolute top-1.5 left-1.5">
            <Dica
              titulo="Pontos de anotação"
              detalhe="Leva a uma nota que pode estar fora do enquadramento."
              lado="baixo"
            >
              <Pilula>
                <span className="p-1 text-muted-foreground">
                  <FileText className="size-3" strokeWidth={1.75} />
                </span>
              </Pilula>
            </Dica>
          </div>

          <div className="absolute top-1.5 right-1.5 flex items-center gap-1">
            <Dica
              titulo="Jogadores na mesa"
              detalhe="Quem entrou pela tela Assistir, do próprio celular."
              lado="baixo"
            >
              <Pilula>
                <Users className="size-3 text-muted-foreground" strokeWidth={1.75} />
                <span className="pr-1 font-mono text-muted-foreground">10</span>
              </Pilula>
            </Dica>
            <Dica
              titulo="Saquinho de dados"
              detalhe="Rola na tela, à vista da mesa."
              lado="baixo"
            >
              <Pilula>
                <span className="p-1 text-muted-foreground">
                  <Dices className="size-3" strokeWidth={1.75} />
                </span>
              </Pilula>
            </Dica>
          </div>

          {/* Ferramentas e zoom nas duas pontas, como no app. */}
          <div className="absolute bottom-1.5 left-1.5">
            <Pilula>
              {FERRAMENTAS.map(({ icone: Icone, rotulo, dica, ativa }) => (
                <Dica key={rotulo} titulo={rotulo} detalhe={dica}>
                  <span
                    className={
                      ativa
                        ? "rounded bg-foreground p-1 text-background"
                        : "p-1 text-muted-foreground"
                    }
                  >
                    <Icone className="size-3" strokeWidth={1.75} />
                  </span>
                </Dica>
              ))}
            </Pilula>
          </div>

          <div className="absolute right-1.5 bottom-1.5 flex items-center gap-1">
            <Pilula>
              <Dica titulo="Menos zoom">
                <span className="p-1 text-muted-foreground">
                  <Minus className="size-3" strokeWidth={1.75} />
                </span>
              </Dica>
              <span className="px-0.5 font-mono text-muted-foreground">175%</span>
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
              <Dica titulo="Tela cheia" detalhe="Some com as colunas e sobra só o mapa.">
                <span className="p-1 text-muted-foreground">
                  <Expand className="size-3" strokeWidth={1.75} />
                </span>
              </Dica>
            </Pilula>

            <Dica
              titulo="Saquinho de dados"
              detalhe="Rola na tela, à vista da mesa. O do site, no canto da página, é este mesmo."
            >
              <span className="grid size-7 place-items-center rounded-full border border-border bg-background/85 text-muted-foreground backdrop-blur">
                <Dices className="size-3.5" strokeWidth={1.75} />
              </span>
            </Dica>
          </div>
        </main>

        {/* Coluna direita: a biblioteca da campanha, uma seção por tipo de
            material. Tudo que entra aqui vale pra campanha toda, não pra cena. */}
        <aside className="flex w-48 shrink-0 flex-col overflow-hidden border-l border-border">
          <Cabecalho nome="Imagens" painel="direita" />
          <Importar icone={Upload} rotulo="Importar imagens" />
          <div className="mx-1.5 mt-1 flex items-center justify-center gap-1.5 rounded-md border border-border py-1.5 text-muted-foreground">
            <FolderPlus className="size-3" strokeWidth={1.75} />
            Nova pasta
          </div>
          <div className="mt-1 flex items-center gap-1.5 px-1.5 py-1">
            <Miniatura className="h-6 w-5" />
            <span className="min-w-0 flex-1 truncate text-muted-foreground">
              Handout 03 - Carta do Barão.jpg
            </span>
            <Plus className="size-3 shrink-0 text-muted-foreground" strokeWidth={1.75} />
            <EllipsisVertical
              className="size-3 shrink-0 text-muted-foreground"
              strokeWidth={1.75}
            />
          </div>

          <Cabecalho nome="Personagens" />
          <div className="mx-1.5 flex items-center justify-center gap-1.5 rounded-md border border-border py-1.5 text-muted-foreground">
            <Plus className="size-3" strokeWidth={1.75} />
            Novo
          </div>
          <div className="mx-1.5 mt-1 flex items-center gap-1.5 rounded-md border border-border px-1.5 py-1 text-muted-foreground/70">
            <Search className="size-3 shrink-0" strokeWidth={1.75} />
            Buscar personagem ou jogador
          </div>
          <ul className="mt-1 flex flex-col">
            {PERSONAGENS.map(({ nome, jogador }) => (
              <li key={nome} className="flex items-center gap-1.5 px-1.5 py-1">
                <span className="grid size-5 shrink-0 place-items-center rounded-full border border-border font-mono text-[8px] text-muted-foreground">
                  {nome[0]}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-foreground">{nome}</span>
                  <span className="block truncate text-muted-foreground/70">{jogador}</span>
                </span>
                <Users className="size-2.5 shrink-0 text-muted-foreground" strokeWidth={1.75} />
              </li>
            ))}
          </ul>

          <Cabecalho nome="Estante" />
          <Importar icone={Upload} rotulo="Importar livros" />
          <div className="mt-1 flex items-center gap-1.5 px-1.5 py-1">
            <BookOpen className="size-3.5 shrink-0 text-muted-foreground" strokeWidth={1.75} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-foreground">
                Compendio-dos-Ermos-alpha.pdf
              </span>
              <span className="block truncate text-muted-foreground/70">
                8.0 MB · p. 17 de 56
              </span>
            </span>
          </div>

          <Cabecalho nome="Sons" />
          <Importar icone={Upload} rotulo="Importar sons" />
          <ul className="mt-1 flex flex-col">
            {SONS.map(({ nome, peso, trilha }) => (
              <li key={nome} className="flex items-center gap-1.5 px-1.5 py-1">
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-foreground">{nome}</span>
                  <span className="block truncate text-muted-foreground/70">{peso}</span>
                </span>
                {trilha ? null : (
                  <AudioLines
                    className="size-2.5 shrink-0 text-muted-foreground"
                    strokeWidth={1.75}
                  />
                )}
                <Trash2 className="size-2.5 shrink-0 text-muted-foreground" strokeWidth={1.75} />
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* A trilha é da sessão, não da cena: trocar de cena não corta a música. */}
      <footer className="flex items-center gap-2 border-t border-border px-2 py-1.5 text-muted-foreground">
        <Dica titulo="Retomar a trilha">
          <span className="grid size-6 shrink-0 place-items-center rounded-full border border-border">
            <AudioLines className="size-3" strokeWidth={1.75} />
          </span>
        </Dica>
        <span className="shrink-0 font-mono text-foreground">Trilha 02 - O Ídolo.mp3</span>
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
        <Dica titulo="Volume" detalhe="Em todas as telas, não só nesta.">
          <Volume2 className="size-3 shrink-0" strokeWidth={1.75} />
        </Dica>
      </footer>
    </div>
  );
}
