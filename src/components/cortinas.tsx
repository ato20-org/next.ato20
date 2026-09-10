/**
 * Abertura de cortinas do site: duas metades de veludo que saem da frente e
 * revelam o conteúdo.
 *
 * É CSS puro de propósito. Se dependesse de JS, as cortinas só apareceriam
 * depois da hidratação e o conteúdo piscaria antes de ser coberto.
 *
 * O desenho é uma metade só; a direita é a mesma espelhada por CSS. Por isso o
 * vão fica em x=100 e é reto: ondulação pra dentro abriria fresta no meio com
 * as duas fechadas, e pra fora uma metade cobriria a outra.
 */

/** Pregas do pano. Mais que isso vira listra na largura que sobra no celular. */
const PREGAS = 9;

/** Altura da sanefa, em unidades do viewBox — o topo drapeado. */
const SANEFA_QUEDA = 25;

/**
 * As pregas nascem franzidas no varão e abrem em leque até a barra, então cada
 * uma é um quadrilátero mais estreito em cima que embaixo.
 */
function desenharPregas() {
  const noTopo = (t: number) => 5 + 95 * t;
  const naBarra = (t: number) => -6 + 112 * t;

  return Array.from({ length: PREGAS }, (_, i) => {
    const inicio = i / PREGAS;
    const fim = (i + 1) / PREGAS;

    return {
      d: `M${noTopo(inicio).toFixed(2)},0 L${noTopo(fim).toFixed(2)},0 L${naBarra(fim).toFixed(2)},100 L${naBarra(inicio).toFixed(2)},100 Z`,
      // Alterna sem repetir de dois em dois, senão a parede de pregas fica
      // com cara de listra de código de barras.
      tom: ["media", "clara", "escura", "media", "escura", "clara"][i % 6],
    };
  });
}

/** Cunhas em que cada arco da sanefa é dividido, pra ela ter drapeado. */
const SANEFA_CUNHAS = 8;

/** Ponto da curva quadrática do arco da sanefa. */
function noArco(u: number, esquerda: number, direita: number, ombro: number) {
  const meio = (esquerda + direita) / 2;
  const x = (1 - u) ** 2 * esquerda + 2 * (1 - u) * u * meio + u ** 2 * direita;
  const y =
    (1 - u) ** 2 * ombro + 2 * (1 - u) * u * SANEFA_QUEDA + u ** 2 * ombro;
  return [x, y] as const;
}

/**
 * Sanefa: arcos pendurados que se sobrepõem. O da ponta encosta o lado direito
 * no vão, pra ele fechar simétrico quando a metade é espelhada.
 *
 * Cada arco é fatiado num leque de cunhas que sai do varão e desce até a barra
 * dele. Com um gradiente só, a sanefa ficava lisa e parecia um recorte de
 * papel em cima das pregas.
 */
function desenharSanefa() {
  const largura = 47;
  const passo = 33;
  const ombro = 5;

  return Array.from({ length: 4 }, (_, i) => {
    const direita = 100 - i * passo;
    const esquerda = direita - largura;

    const meio = (esquerda + direita) / 2;

    // Um vinco da sanefa: do varão até a barra, curvando em direção ao centro.
    // Reto ele virava listra vertical; é a curvatura que lê como pano caindo.
    const vinco = (u: number) => {
      const topo = esquerda + (direita - esquerda) * u;
      const [ax, ay] = noArco(u, esquerda, direita, ombro);
      // Curvatura curta e com o controle já perto da barra: com 0.5 e meia
      // altura os vincos se cruzavam e a sanefa virava um monte de espirais.
      const controle = [topo + (meio - topo) * 0.16, ay * 0.72] as const;
      return { topo, ax, ay, controle };
    };

    const cunhas = Array.from({ length: SANEFA_CUNHAS }, (_, j) => {
      // Cunhas vizinhas dividem o mesmo vinco, uma descendo e a outra subindo,
      // então as bordas encaixam sem costura aparente.
      const a = vinco(j / SANEFA_CUNHAS);
      const b = vinco((j + 1) / SANEFA_CUNHAS);
      const n = (v: number) => v.toFixed(2);

      return {
        d:
          `M${n(a.topo)},0 L${n(b.topo)},0 ` +
          `Q${n(b.controle[0])},${n(b.controle[1])} ${n(b.ax)},${n(b.ay)} ` +
          `L${n(a.ax)},${n(a.ay)} ` +
          `Q${n(a.controle[0])},${n(a.controle[1])} ${n(a.topo)},0 Z`,
        tom: ["sanefaClara", "sanefaMedia", "sanefaEscura", "sanefaMedia"][j % 4],
      };
    });

    return {
      chave: `sanefa-${i}`,
      cunhas,
      barra: `M${direita},${ombro} Q${(esquerda + direita) / 2},${SANEFA_QUEDA} ${esquerda},${ombro}`,
    };
  }).reverse();
}

const PREGAS_DESENHADAS = desenharPregas();
const SANEFA_DESENHADA = desenharSanefa();

/** Escuro no vinco, claro na barriga da prega. A luz não vem do centro. */
const TONS = {
  escura: ["oklch(0.09 0 0)", "oklch(0.2 0 0)", "oklch(0.105 0 0)"],
  media: ["oklch(0.1 0 0)", "oklch(0.245 0 0)", "oklch(0.12 0 0)"],
  clara: ["oklch(0.115 0 0)", "oklch(0.295 0 0)", "oklch(0.135 0 0)"],
  // A sanefa pega a luz de cima, então vive uns tons acima do pano.
  sanefaEscura: ["oklch(0.115 0 0)", "oklch(0.2 0 0)", "oklch(0.125 0 0)"],
  sanefaMedia: ["oklch(0.13 0 0)", "oklch(0.26 0 0)", "oklch(0.145 0 0)"],
  sanefaClara: ["oklch(0.15 0 0)", "oklch(0.315 0 0)", "oklch(0.16 0 0)"],
} as const;

function Meia({ lado }: { lado: "esquerda" | "direita" }) {
  const id = (nome: string) => `${nome}-${lado}`;

  return (
    <div className={`cortina cortina-${lado}`}>
      <svg
        className="size-full"
        viewBox="0 0 100 100"
        /* `slice` cobre a metade recortando, em vez de achatar: com `none` as
           pregas viravam listras em tela estreita. O âncora `xMax` mantém o vão
           (x=100) sempre visível, que é a borda que importa. */
        preserveAspectRatio="xMaxYMid slice"
        aria-hidden
      >
        <defs>
          {Object.entries(TONS).map(([nome, [vinco, barriga, sombra]]) => (
            // `objectBoundingBox` é o padrão: um gradiente serve todas as
            // pregas, cada uma recebendo a luz na própria largura.
            <linearGradient key={nome} id={id(nome)} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={vinco} />
              <stop offset="38%" stopColor={barriga} />
              <stop offset="72%" stopColor={sombra} />
              <stop offset="100%" stopColor={vinco} />
            </linearGradient>
          ))}

          {/* O pano cai na sombra em direção à barra: sem isso a parede de
              pregas fica com o mesmo peso de cima a baixo e parece papel. */}
          <linearGradient id={id("queda")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0 0 0)" stopOpacity="0" />
            <stop offset="55%" stopColor="oklch(0 0 0)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="oklch(0 0 0)" stopOpacity="0.55" />
          </linearGradient>
        </defs>

        {/* Fundo cheio: garante que nenhuma folga entre pregas vaze conteúdo. */}
        <rect width="100" height="100" fill="oklch(0.115 0 0)" />

        {PREGAS_DESENHADAS.map(({ d, tom }) => (
          <path key={d} d={d} fill={`url(#${id(tom)})`} />
        ))}

        <rect width="100" height="100" fill={`url(#${id("queda")})`} />

        {SANEFA_DESENHADA.map(({ chave, cunhas, barra }) => (
          <g key={chave}>
            {cunhas.map(({ d, tom }) => (
              <path key={d} d={d} fill={`url(#${id(tom)})`} />
            ))}
            {/* Sombra logo abaixo da barra: é ela que faz o arco da frente
                descolar do que está atrás, em vez de virar um bloco só. */}
            <path
              d={barra}
              fill="none"
              stroke="oklch(0 0 0)"
              strokeOpacity={0.5}
              strokeWidth={1.6}
            />
            {/* O galão. No veludo preto das referências ele é dourado, e é o
                único ponto de cor — cai no mesmo âmbar do resto do site. */}
            <path
              d={barra}
              fill="none"
              stroke="var(--accent)"
              strokeOpacity={0.3}
              strokeWidth={0.55}
            />
          </g>
        ))}

      </svg>
    </div>
  );
}

export function Cortinas() {
  return (
    <div className="cortinas" aria-hidden>
      <Meia lado="esquerda" />
      <Meia lado="direita" />
    </div>
  );
}
