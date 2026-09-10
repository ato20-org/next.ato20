import { TIPOS, corDaFace, type TipoDado } from "@/lib/dados-tipos";
import { facesProjetadas, poseDaFace } from "@/lib/projecao";

/** Altura de onde o dado sai da mão, em pixel. */
const ALTURA_DA_MAO = 90;
/** Aceleração da queda, em pixel por segundo ao quadrado. */
const GRAVIDADE = 2600;
/** Quanto da velocidade sobra depois de bater no chão. */
const RESTITUICAO = 0.42;
/** Quantas batidas antes de assentar. */
const BATIDAS = 2;
/** Atrito do deslizamento no chão. */
const ARRASTO = 0.86;

/**
 * Inclinação da pose de repouso, em radianos.
 *
 * Visto de cima a prumo, um dado parado mostra a face de cima e mais nada — o
 * d6 vira um quadrado e o d4 um triângulo, ambos chapados. Um desvio pequeno
 * mostra as laterais e devolve o volume, sem tirar a face de cima de ser a mais
 * frontal: a menor separação entre normais vizinhas é a do d20, uns 41°, bem
 * mais que isto.
 */
const INCLINACAO: [number, number] = [0.22, 0.17];

export type Dado = {
  id: string;
  tipo: TipoDado;
  /** A face que ele vai mostrar. Decidida no arremesso, antes de girar. */
  face: number;
  /** O número gravado nessa face. */
  gravado: number;

  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Altura sobre o plano da página. Zero é pousado. */
  altura: number;
  vAltura: number;
  batidas: number;

  girX: number;
  girY: number;
  velGirX: number;
  velGirY: number;

  raio: number;
  parado: boolean;
};

let sequencia = 0;

/**
 * Lança um dado. O valor sai aqui, no arremesso — não da física.
 *
 * É o modelo do app: com o sorteio na frente o número dá pra conferir e pra
 * publicar; deixar a física decidir daria um número que só existe no quadro em
 * que o dado parou.
 */
export function arremessar(
  tipo: TipoDado,
  x: number,
  y: number,
  impulsoX: number,
  impulsoY: number,
  raio: number,
): Dado {
  sequencia += 1;

  const quantas = tipo.poliedro.faces.length;
  const face = Math.floor(Math.random() * quantas);
  const inicio = tipo.faces === 10 ? 0 : 1;

  const forca = Math.min(1, Math.hypot(impulsoX, impulsoY) / 1400);

  return {
    id: `dado-${sequencia}`,
    tipo,
    face,
    gravado: inicio + face,
    x,
    y,
    vx: impulsoX,
    vy: impulsoY,
    altura: ALTURA_DA_MAO,
    vAltura: 260 * forca,
    batidas: 0,
    girX: Math.random() * Math.PI * 2,
    girY: Math.random() * Math.PI * 2,
    // O giro acompanha o arremesso: dado jogado com força roda mais.
    velGirX: (6 + forca * 22) * (Math.random() < 0.5 ? -1 : 1),
    velGirY: (6 + forca * 22) * (Math.random() < 0.5 ? -1 : 1),
    raio,
    parado: false,
  };
}

/**
 * Avança um dado no tempo. Devolve se ele ainda está em movimento.
 *
 * Os limites da tela entram como paredes: um dado que sai da vista é um dado
 * perdido, e o gesto de jogar longe é justamente o que a mesa faz.
 */
export function avancar(dado: Dado, dt: number, largura: number, altura: number): boolean {
  if (dado.parado) return false;

  dado.x += dado.vx * dt;
  dado.y += dado.vy * dt;

  const borda = dado.raio;
  if (dado.x < borda) {
    dado.x = borda;
    dado.vx = -dado.vx * RESTITUICAO;
  } else if (dado.x > largura - borda) {
    dado.x = largura - borda;
    dado.vx = -dado.vx * RESTITUICAO;
  }
  if (dado.y < borda) {
    dado.y = borda;
    dado.vy = -dado.vy * RESTITUICAO;
  } else if (dado.y > altura - borda) {
    dado.y = altura - borda;
    dado.vy = -dado.vy * RESTITUICAO;
  }

  dado.vAltura -= GRAVIDADE * dt;
  dado.altura += dado.vAltura * dt;

  if (dado.altura <= 0) {
    dado.altura = 0;

    if (dado.batidas < BATIDAS && Math.abs(dado.vAltura) > 90) {
      dado.batidas += 1;
      dado.vAltura = -dado.vAltura * RESTITUICAO;
      dado.vx *= ARRASTO;
      dado.vy *= ARRASTO;
    } else {
      dado.vAltura = 0;
      dado.vx *= 0.82;
      dado.vy *= 0.82;
    }
  }

  const voando = dado.altura > 0.5 || Math.hypot(dado.vx, dado.vy) > 12;

  if (voando) {
    dado.girX += dado.velGirX * dt;
    dado.girY += dado.velGirY * dt;
    return true;
  }

  // Assentando: a pose corre para a que mostra a face sorteada.
  const [poseX, poseY] = poseDaFace(dado.tipo.poliedro, dado.face);
  const alvoX = poseX + INCLINACAO[0];
  const alvoY = poseY + INCLINACAO[1];
  const restaX = menorVolta(alvoX - dado.girX);
  const restaY = menorVolta(alvoY - dado.girY);

  if (Math.abs(restaX) < 0.01 && Math.abs(restaY) < 0.01) {
    dado.girX = alvoX;
    dado.girY = alvoY;
    dado.vx = 0;
    dado.vy = 0;
    dado.parado = true;
    return false;
  }

  dado.girX += restaX * 0.18;
  dado.girY += restaY * 0.18;
  return true;
}

/** O caminho mais curto entre dois ângulos: girar 350° é girar -10°. */
function menorVolta(angulo: number): number {
  const volta = Math.PI * 2;
  return ((((angulo + Math.PI) % volta) + volta) % volta) - Math.PI;
}

/**
 * Pinta um dado. A sombra sai antes das faces, e o número por último — ele tem
 * que ficar por cima do polígono vizinho quando encosta na aresta.
 */
export function pintar(ctx: CanvasRenderingContext2D, dado: Dado, escalaDoAr = 1) {
  const alto = dado.altura / ALTURA_DA_MAO;
  const raio = dado.raio * (1 + alto * 0.16) * escalaDoAr;

  // Sombra: some e espalha conforme o dado sobe.
  ctx.save();
  ctx.globalAlpha = 0.34 * (1 - alto * 0.75);
  ctx.translate(dado.x, dado.y + dado.raio * 0.42);
  ctx.scale(1, 0.42);
  const espalha = dado.raio * (0.95 + alto * 0.7);
  const gradiente = ctx.createRadialGradient(0, 0, 0, 0, 0, espalha);
  gradiente.addColorStop(0, "rgba(0,0,0,0.85)");
  gradiente.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gradiente;
  ctx.beginPath();
  ctx.arc(0, 0, espalha, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  const faces = facesProjetadas(dado.tipo.poliedro, dado.girX, dado.girY);
  const visiveis = faces
    .filter((face) => face.frontalidade > 0.02)
    .sort((a, b) => a.profundidade - b.profundidade);

  ctx.save();
  ctx.translate(dado.x, dado.y - dado.altura);
  ctx.lineJoin = "round";
  ctx.lineWidth = Math.max(0.6, raio * 0.03);

  for (const face of visiveis) {
    ctx.beginPath();
    ctx.moveTo(face.pontos[0] * raio, face.pontos[1] * raio);
    for (let i = 2; i < face.pontos.length; i += 2) {
      ctx.lineTo(face.pontos[i] * raio, face.pontos[i + 1] * raio);
    }
    ctx.closePath();
    ctx.fillStyle = corDaFace(dado.tipo.hex, face.luz);
    ctx.fill();
    // A aresta é a cor da face, mais escura: sem ela duas faces de brilho
    // parecido viram uma mancha e o sólido perde o facetado.
    ctx.strokeStyle = corDaFace(dado.tipo.hex, face.luz * 0.4);
    ctx.stroke();
  }

  // O número vai na face que mais encara a câmera — é ele que se lê.
  const frente = visiveis.at(-1);
  if (frente) {
    const inicio = dado.tipo.faces === 10 ? 0 : 1;
    ctx.fillStyle = dado.tipo.tinta;
    ctx.font = `700 ${raio * 0.78}px var(--font-mono), ui-monospace, monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      String(inicio + frente.indice),
      frente.centro[0] * raio * 0.55,
      frente.centro[1] * raio * 0.55,
    );
  }

  ctx.restore();
}

export { TIPOS };
