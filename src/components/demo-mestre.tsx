import {
  Dices,
  Eraser,
  Hand,
  MapPin,
  Maximize,
  Minus,
  MonitorPlay,
  MousePointer2,
  PanelLeftOpen,
  Pencil,
  Play,
  Plus,
  QrCode,
  Repeat,
  Ruler,
  SquareDashedBottom,
  Users,
  Volume2,
} from "lucide-react";


/**
 * Mockup da visão do mestre.
 *
 * É ilustração, não captura: o Operador só roda dentro do aplicativo — ele
 * checa a marca do Tauri e recusa uma aba de navegador —, então não há como
 * fotografá-lo daqui. A estrutura segue a do app: barra de sessão com o que
 * está no ar, colunas de painel com as abas reais (Cenas, Imagens, Camadas,
 * Personagens), palco com as seis ferramentas e a barra de trilha embaixo.
 *
 * Os nomes de cena, camada e personagem são fictícios.
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

/** O que cada aba do dock guarda. */
const ABAS = {
  Cenas: "As cenas da campanha. A que está no ar não é a que você edita.",
  Imagens: "A biblioteca de mapas, fichas e retratos da campanha.",
  Camadas: "O que está na cena, em ordem de empilhamento.",
  Sons: "As trilhas e efeitos da campanha.",
  Personagens: "As fichas do elenco, com retrato e anotações.",
} as const;

const CENAS = [
  { nome: "Taverna do Javali", atual: true },
  { nome: "Estrada de Vent", atual: false },
  { nome: "Cripta inundada", atual: false },
  { nome: "Mercado ao amanhecer", atual: false },
];

const CAMADAS = ["Piso da taverna", "Balcão", "Lareira", "Névoa", "Traços"];

const PERSONAGENS = [
  { nome: "Kael", inicial: "K" },
  { nome: "Mira", inicial: "M" },
  { nome: "Bran", inicial: "B" },
  { nome: "Ysolde", inicial: "Y" },
];

/** Fichas na cena, em coordenadas do palco. */
const FICHAS = [
  { x: 148, y: 176, inicial: "K", luz: true },
  { x: 196, y: 208, inicial: "M", luz: false },
  { x: 126, y: 232, inicial: "B", luz: false },
  { x: 196, y: 128, inicial: "Y", luz: false },
];

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
        className={`pointer-events-none absolute left-1/2 z-20 hidden w-max max-w-52 -translate-x-1/2 rounded-md border border-border bg-background px-2 py-1.5 text-left shadow-lg shadow-black/60 group-hover/dica:block ${
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

function Aba({ nome, ativa }: { nome: keyof typeof ABAS; ativa?: boolean }) {
  return (
    <Dica titulo={nome} detalhe={ABAS[nome]} lado="baixo">
      <span
        className={
          ativa
            ? "rounded border border-border bg-muted px-1.5 py-0.5 text-foreground"
            : "px-1.5 py-0.5 text-muted-foreground"
        }
      >
        {nome}
      </span>
    </Dica>
  );
}

/** O palco: mapa com grade, névoa, ponto de anotação, traço e fichas. */
function Palco() {
  return (
    <svg
      viewBox="0 0 360 280"
      preserveAspectRatio="xMidYMid slice"
      className="size-full"
      aria-hidden
    >
      <defs>
        <pattern id="grade-demo" width="20" height="20" patternUnits="userSpaceOnUse">
          <path
            d="M20 0H0V20"
            fill="none"
            stroke="var(--foreground)"
            strokeOpacity={0.06}
            strokeWidth={1}
          />
        </pattern>
        <radialGradient id="luz-demo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.28} />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
        </radialGradient>
      </defs>

      <rect width="360" height="280" fill="oklch(0.13 0 0)" />

      {/* Planta da taverna. */}
      <path
        d="M64,58 H268 L296,96 V214 H206 L182,240 H92 L64,206 Z"
        fill="oklch(0.185 0 0)"
        stroke="var(--foreground)"
        strokeOpacity={0.26}
        strokeWidth={1.5}
      />
      <rect width="360" height="280" fill="url(#grade-demo)" />

      {/* Lareira acesa: a única cor do palco. */}
      <circle cx="148" cy="176" r="58" fill="url(#luz-demo)" />

      {/* Área escondida: a mesa vê preto sólido; o mestre vê a marcação. */}
      <g>
        <rect x="212" y="104" width="80" height="98" fill="oklch(0.06 0 0)" />
        <rect
          x="212"
          y="104"
          width="80"
          height="98"
          fill="none"
          stroke="var(--foreground)"
          strokeOpacity={0.35}
          strokeWidth={1}
          strokeDasharray="4 3"
        />
      </g>

      {/* Traço à mão livre. */}
      <path
        d="M92,246 C118,232 136,250 158,238 C176,228 188,244 208,236"
        fill="none"
        stroke="var(--foreground)"
        strokeOpacity={0.45}
        strokeWidth={2}
        strokeLinecap="round"
      />

      {FICHAS.map(({ x, y, inicial, luz }) => (
        <g key={inicial}>
          {luz ? (
            <circle cx={x} cy={y} r="15" fill="none" stroke="var(--accent)" strokeOpacity={0.7} strokeWidth={1.5} />
          ) : null}
          <circle cx={x} cy={y} r="11" fill="oklch(0.28 0 0)" stroke="var(--foreground)" strokeOpacity={0.5} strokeWidth={1} />
          <text
            x={x}
            y={y + 4}
            textAnchor="middle"
            fill="var(--foreground)"
            fontSize="11"
            fontFamily="var(--font-mono)"
          >
            {inicial}
          </text>
        </g>
      ))}

      {/* Ponto de anotação: só o mestre vê. */}
      <g transform="translate(252,72)">
        <circle r="8" fill="oklch(0.2 0 0)" stroke="var(--accent)" strokeOpacity={0.8} strokeWidth={1.2} />
        <circle r="2.5" fill="var(--accent)" fillOpacity={0.8} />
      </g>
    </svg>
  );
}

export function DemoMestre() {
  return (
    <div className="flex aspect-16/10 min-w-[56rem] flex-col bg-background text-[11px] select-none">
      {/* Barra da sessão: o que está no ar e como as outras telas entram. */}
      <header className="flex items-center gap-2 border-b border-border px-2 py-1.5">
        <Dica
          titulo="No ar"
          detalhe="A cena que a mesa está vendo agora. Você edita outra sem ninguém ver o rascunho."
          lado="baixo"
        >
          <span className="flex items-center gap-1.5 rounded-md border border-border bg-muted/60 px-1.5 py-1">
            <span className="size-1.5 rounded-full bg-accent" />
            <span className="font-mono text-foreground">NO AR</span>
            <span className="text-muted-foreground">Taverna do Javali</span>
          </span>
        </Dica>

        <span className="ml-auto flex items-center gap-2 text-muted-foreground">
          <Dica
            titulo="Convidar a mesa"
            detalhe="QR para os celulares e para a TV de outro aparelho."
            lado="baixo"
          >
            <QrCode className="size-3.5" strokeWidth={1.75} />
          </Dica>
          <Dica
            titulo="Abrir a Plateia"
            detalhe="A tela da mesa, nesta máquina."
            lado="baixo"
          >
            <MonitorPlay className="size-3.5" strokeWidth={1.75} />
          </Dica>
        </span>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* Coluna esquerda. */}
        <aside className="flex w-40 shrink-0 flex-col border-r border-border">
          <div className="flex gap-0.5 border-b border-border p-1 font-mono">
            <Aba nome="Cenas" ativa />
            <Aba nome="Imagens" />
          </div>
          <ul className="flex flex-col gap-0.5 p-1">
            {CENAS.map(({ nome, atual }) => (
              <li
                key={nome}
                className={
                  atual
                    ? "truncate rounded bg-muted px-1.5 py-1 text-foreground"
                    : "truncate px-1.5 py-1 text-muted-foreground"
                }
              >
                {nome}
              </li>
            ))}
          </ul>
        </aside>

        {/* Palco. */}
        <main className="relative min-w-0 flex-1 overflow-hidden">
          <Palco />

          <div className="absolute top-1.5 left-1.5 flex items-center gap-1">
            <Dica titulo="Mostrar o painel esquerdo" lado="baixo">
              <Pilula>
                <PanelLeftOpen className="size-3 text-muted-foreground" strokeWidth={1.75} />
              </Pilula>
            </Dica>
            <Dica
              titulo="Pontos de anotação"
              detalhe="Leva a um ponto que pode estar fora do enquadramento."
              lado="baixo"
            >
              <Pilula>
                <MapPin className="size-3 text-muted-foreground" strokeWidth={1.75} />
                <span className="pr-1 font-mono text-muted-foreground">3</span>
              </Pilula>
            </Dica>
          </div>

          <div className="absolute top-1.5 right-1.5">
            <Dica
              titulo="Jogadores na mesa"
              detalhe="Quem entrou pela Plateia, do próprio celular."
              lado="baixo"
            >
              <Pilula>
                <Users className="size-3 text-muted-foreground" strokeWidth={1.75} />
                <span className="pr-1 font-mono text-muted-foreground">4</span>
              </Pilula>
            </Dica>
          </div>

          {/* Ferramentas e zoom lado a lado: no app são o mesmo tipo de gesto. */}
          <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1">
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
            <Pilula>
              <Dica titulo="Menos zoom">
                <span className="p-1 text-muted-foreground">
                  <Minus className="size-3" strokeWidth={1.75} />
                </span>
              </Dica>
              <span className="px-0.5 font-mono text-muted-foreground">78%</span>
              <Dica titulo="Mais zoom">
                <span className="p-1 text-muted-foreground">
                  <Plus className="size-3" strokeWidth={1.75} />
                </span>
              </Dica>
              <Dica titulo="Encaixar a cena inteira">
                <span className="p-1 text-muted-foreground">
                  <Maximize className="size-3" strokeWidth={1.75} />
                </span>
              </Dica>
              <Dica
                titulo="Régua"
                detalhe="Mede sobre o mapa. A mesa acompanha a conta."
              >
                <span className="p-1 text-muted-foreground">
                  <Ruler className="size-3" strokeWidth={1.75} />
                </span>
              </Dica>
            </Pilula>
          </div>

          <div className="absolute right-1.5 bottom-1.5">
            <Dica
              titulo="Saquinho de dados"
              detalhe="Rola na tela, à vista da mesa. O do site, no canto da página, é este mesmo."
            >
              <Pilula>
                <span className="p-1 text-muted-foreground">
                  <Dices className="size-3" strokeWidth={1.75} />
                </span>
              </Pilula>
            </Dica>
          </div>
        </main>

        {/* Coluna direita. */}
        <aside className="flex w-40 shrink-0 flex-col border-l border-border">
          <div className="flex gap-0.5 border-b border-border p-1 font-mono">
            <Aba nome="Camadas" ativa />
            <Aba nome="Sons" />
          </div>
          <ul className="flex flex-col gap-0.5 p-1">
            {CAMADAS.map((camada) => (
              <li key={camada} className="truncate px-1.5 py-1 text-muted-foreground">
                {camada}
              </li>
            ))}
          </ul>

          <div className="flex gap-0.5 border-y border-border p-1 font-mono">
            <Aba nome="Personagens" ativa />
          </div>
          <ul className="flex flex-col gap-1 p-1.5">
            {PERSONAGENS.map(({ nome, inicial }) => (
              <li key={nome} className="flex items-center gap-1.5 text-muted-foreground">
                <span className="grid size-4 shrink-0 place-items-center rounded-full border border-border font-mono text-[8px]">
                  {inicial}
                </span>
                {nome}
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* A trilha é da sessão, não da cena: trocar de cena não corta a música. */}
      <footer className="flex items-center gap-2 border-t border-border px-2 py-1.5 text-muted-foreground">
        <Dica titulo="Retomar a trilha">
          <Play className="size-3 shrink-0" strokeWidth={1.75} />
        </Dica>
        <span className="shrink-0 font-mono">taverna-ambiente.mp3</span>
        <span className="h-px min-w-0 flex-1 bg-border">
          <span className="block h-px w-2/5 bg-foreground/50" />
        </span>
        <span className="shrink-0 font-mono">2:14 / 5:40</span>
        <Dica titulo="Repetir a faixa">
          <Repeat className="size-3 shrink-0" strokeWidth={1.75} />
        </Dica>
        <Dica titulo="Volume" detalhe="Em todas as telas, não só nesta.">
          <Volume2 className="size-3 shrink-0" strokeWidth={1.75} />
        </Dica>
      </footer>
    </div>
  );
}
