/**
 * Um único listener de ponteiro e um único requestAnimationFrame para tudo que
 * reage ao mouse no hero — os dados do fundo e o ASCII da marca —, em vez de um
 * par de cada.
 *
 * O laço para sozinho quando ninguém mais tem o que mover: com o mouse parado o
 * custo volta a zero.
 */

export type Ponteiro = {
  /** -1..1 a partir do centro da tela. Os dados giram com isso. */
  x: number;
  y: number;
  /** Coordenada de viewport em px. O ASCII precisa da posição na própria caixa. */
  clienteX: number;
  clienteY: number;
};

/** Devolve se ainda tem o que mover. */
type Passo = (ponteiro: Ponteiro) => boolean;

const inscritos = new Set<Passo>();
const ponteiro: Ponteiro = { x: 0, y: 0, clienteX: -1e4, clienteY: -1e4 };
let rodando = false;

function quadro() {
  let algumMexeu = false;
  for (const passo of inscritos) {
    if (passo(ponteiro)) algumMexeu = true;
  }

  if (algumMexeu) {
    requestAnimationFrame(quadro);
  } else {
    rodando = false;
  }
}

function aoMover(evento: PointerEvent) {
  ponteiro.x = (evento.clientX / window.innerWidth) * 2 - 1;
  ponteiro.y = (evento.clientY / window.innerHeight) * 2 - 1;
  ponteiro.clienteX = evento.clientX;
  ponteiro.clienteY = evento.clientY;

  if (!rodando) {
    rodando = true;
    requestAnimationFrame(quadro);
  }
}

export function inscrever(passo: Passo) {
  if (inscritos.size === 0) {
    window.addEventListener("pointermove", aoMover, { passive: true });
  }
  inscritos.add(passo);

  return () => {
    inscritos.delete(passo);
    if (inscritos.size === 0) {
      window.removeEventListener("pointermove", aoMover);
      rodando = false;
    }
  };
}

/** Sem mouse de verdade não há o que seguir; e movimento reduzido é escolha. */
export function seguirPonteiroPermitido() {
  return (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
