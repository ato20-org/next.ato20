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

/**
 * O palco: o mapa em si, sob os cartões e as pílulas de ferramenta.
 *
 * `prefixo` existe porque o mesmo mapa aparece mais de uma vez na página — a
 * demonstração da câmera o desenha no palco do mestre e de novo no espectador — e os
 * ids do `<defs>` são globais no documento. Com ids repetidos, o `url(#…)`
 * resolve para a primeira cópia, e se ela estiver num bloco escondido por
 * `display: none` o gradiente some da outra.
 *
 * `mesa` é o mapa como a janela do espectador o recebe: a área escondida continua preta, mas
 * sem o tracejado que só o mestre vê.
 */
export function Palco({
  prefixo = "demo",
  mesa = false,
}: {
  prefixo?: string;
  mesa?: boolean;
} = {}) {
  return (
    <svg
      viewBox="0 0 360 300"
      preserveAspectRatio="xMidYMid slice"
      className="size-full"
      aria-hidden
    >
      <defs>
        <pattern id={`grade-${prefixo}`} width="18" height="18" patternUnits="userSpaceOnUse">
          <path
            d="M18 0H0V18"
            fill="none"
            stroke="var(--foreground)"
            strokeOpacity={0.07}
            strokeWidth={0.6}
          />
        </pattern>
        <radialGradient id={`luz-${prefixo}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.22} />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
        </radialGradient>
        <radialGradient id={`sangue-${prefixo}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="oklch(0.4 0.19 25)" stopOpacity={0.7} />
          <stop offset="100%" stopColor="oklch(0.28 0.14 25)" stopOpacity={0} />
        </radialGradient>
        {/* A planta recorta tudo que é piso: sem isto as tábuas e o entulho
            passariam por cima da parede e o cômodo perderia o contorno. */}
        <clipPath id={`piso-${prefixo}`}>
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

      <g clipPath={`url(#piso-${prefixo})`}>
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

        <circle cx="128" cy="158" r="34" fill={`url(#luz-${prefixo})`} />
        <circle cx="252" cy="210" r="26" fill={`url(#luz-${prefixo})`} />
        <ellipse cx="170" cy="204" rx="30" ry="19" fill={`url(#sangue-${prefixo})`} />

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

      <rect width="360" height="300" fill={`url(#grade-${prefixo})`} />

      {/* Área escondida: a mesa vê preto sólido; o mestre vê a marcação. */}
      <g>
        <rect x="216" y="176" width="82" height="58" fill="oklch(0.06 0 0)" />
        {mesa ? null : (
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
        )}
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
