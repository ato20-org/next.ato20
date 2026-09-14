import { type Dado } from "@/lib/dado-arremesso";

const VOLTA = Math.PI * 2;

/** Aceleração do puxão do poço, em pixel por segundo ao quadrado. */
const ATRACAO = 3400;

/**
 * Empurrão para fora no instante em que o poço abre, em pixel por segundo.
 *
 * Sem ele o dado parte do repouso e a sucção começa lenta demais pra se ler
 * como sucção. O recuo dura uns 0,1 s e dá o tranco que anuncia o puxão.
 */
const RECUO = 340;

/**
 * Constante do rodopio: a volta por segundo é `GIRO / distância`.
 *
 * Mesma sensação do patinador que fecha os braços — quanto mais perto do
 * centro, mais rápido o dado roda em torno dele.
 */
const GIRO = 1500;

/** Teto da volta por segundo. Sem ele o dado pisca entre quadros no fim. */
const VOLTA_MAXIMA = 24;

/** Distância em que o dado começa a encolher, em pixel. */
const FUNIL = 240;

/** Abaixo disto o dado já entrou no saquinho. */
const BOCA = 6;

/**
 * Raio do redemoinho desenhado, em pixel.
 *
 * Bem maior que o botão de 44 px que fica por cima dele: o miolo da espiral
 * some atrás do botão, e é a borda que sobra que precisa ser vista.
 */
const BOCA_DO_POCO = 58;

export type Sugado = {
  dado: Dado;
  /** O raio de antes do funil: a escala sai dele, não do raio já encolhido. */
  raioOriginal: number;
  /** Onde o dado está na órbita, em radianos. */
  angulo: number;
  /** Distância até o poço, em pixel. */
  distancia: number;
  /** Velocidade radial, em pixel por segundo. Negativa é afastando. */
  velocidade: number;
  /** De 1 a 0, o quanto do dado ainda está de fora. */
  escala: number;
};

/** Entrega um dado da mesa ao poço, na órbita em que ele já estava. */
export function sugar(dado: Dado, alvoX: number, alvoY: number): Sugado {
  const dx = dado.x - alvoX;
  const dy = dado.y - alvoY;

  return {
    dado,
    raioOriginal: dado.raio,
    angulo: Math.atan2(dy, dx),
    distancia: Math.max(BOCA, Math.hypot(dx, dy)),
    velocidade: -RECUO,
    escala: 1,
  };
}

/**
 * Até onde a órbita cabe na tela, naquele ângulo, em pixel.
 *
 * A espiral gira o dado em torno do saquinho mantendo a distância, e o
 * saquinho fica num canto: sem este teto, um dado do canto oposto sai pela
 * borda de cima antes de começar a entrar — some da vista em vez de ser
 * engolido. Preso ao teto ele raspa a borda até a espiral o trazer pra dentro.
 */
function alcance(
  alvoX: number,
  alvoY: number,
  angulo: number,
  largura: number,
  altura: number,
  margem: number,
): number {
  const cos = Math.cos(angulo);
  const sin = Math.sin(angulo);
  let teto = Infinity;

  if (cos > 1e-6) teto = Math.min(teto, (largura - margem - alvoX) / cos);
  else if (cos < -1e-6) teto = Math.min(teto, (margem - alvoX) / cos);

  if (sin > 1e-6) teto = Math.min(teto, (altura - margem - alvoY) / sin);
  else if (sin < -1e-6) teto = Math.min(teto, (margem - alvoY) / sin);

  return Math.max(BOCA, teto);
}

/**
 * Avança um dado sendo engolido. Devolve se ele ainda está de fora.
 *
 * A espiral é o próprio movimento: a distância cai com aceleração constante e
 * o ângulo corre mais rápido conforme ela cai. O encolhimento entra só no
 * último palmo — um dado que mingua a tela toda parece estar indo embora, não
 * entrando em algum lugar.
 */
export function avancarSuccao(
  sugado: Sugado,
  alvoX: number,
  alvoY: number,
  largura: number,
  altura: number,
  dt: number,
): boolean {
  sugado.velocidade += ATRACAO * dt;
  sugado.distancia -= sugado.velocidade * dt;
  if (sugado.distancia <= BOCA) return false;

  sugado.angulo += Math.min(VOLTA_MAXIMA, GIRO / sugado.distancia) * dt;
  sugado.escala = Math.max(0.05, Math.min(1, sugado.distancia / FUNIL));

  // O teto entra depois do giro: é o ângulo novo que diz quanto ainda cabe.
  const margem = sugado.raioOriginal * sugado.escala;
  sugado.distancia = Math.min(
    sugado.distancia,
    alcance(alvoX, alvoY, sugado.angulo, largura, altura, margem),
  );

  const dado = sugado.dado;
  dado.x = alvoX + Math.cos(sugado.angulo) * sugado.distancia;
  dado.y = alvoY + Math.sin(sugado.angulo) * sugado.distancia;
  dado.raio = sugado.raioOriginal * sugado.escala;

  // Sai do plano da página conforme entra: é o que apaga a sombra, que não
  // teria em que chão cair.
  dado.altura = (1 - sugado.escala) * 26;

  // E tomba cada vez mais rápido, mantendo o lado pra que já girava.
  const rodopio = 7 + (1 - sugado.escala) * 26;
  dado.girX += rodopio * (dado.velGirX < 0 ? -1 : 1) * dt;
  dado.girY += rodopio * 1.3 * (dado.velGirY < 0 ? -1 : 1) * dt;

  return true;
}

/**
 * Pinta o poço sobre o saquinho.
 *
 * Vai por cima dos dados de propósito: é o núcleo escuro passando na frente
 * que faz o dado sumir engolido, e não apenas encolher até o nada.
 */
export function pintarBuraco(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  forca: number,
  fase: number,
) {
  const raio = BOCA_DO_POCO * forca;
  if (raio < 1) return;

  ctx.save();
  ctx.translate(x, y);

  const poco = ctx.createRadialGradient(0, 0, 0, 0, 0, raio);
  poco.addColorStop(0, `rgba(0,0,0,${0.92 * forca})`);
  poco.addColorStop(0.5, `rgba(0,0,0,${0.5 * forca})`);
  poco.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = poco;
  ctx.beginPath();
  ctx.arc(0, 0, raio, 0, VOLTA);
  ctx.fill();

  // Três braços de espiral, que é o que dá a direção do redemoinho — um anel
  // liso giraria sem que se visse pra que lado.
  //
  // Eles varrem de fora pra dentro, e não do centro pra fora: o botão do
  // saquinho tampa o miolo, então o que precisa aparecer é a parte larga.
  ctx.rotate(fase);
  ctx.lineCap = "round";

  for (let braco = 0; braco < 3; braco += 1) {
    ctx.beginPath();
    for (let passo = 0; passo <= 20; passo += 1) {
      const t = (passo / 20) * 4.6;
      const r = raio * Math.exp(-0.2 * t);
      const a = (braco * VOLTA) / 3 + t;
      const px = Math.cos(a) * r;
      const py = Math.sin(a) * r;
      if (passo === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.lineWidth = 1.6;
    ctx.strokeStyle = `rgba(255,255,255,${0.5 * forca})`;
    ctx.stroke();
  }

  ctx.restore();
}
