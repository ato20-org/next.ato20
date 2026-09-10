"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Dices, X } from "lucide-react";

import { DadoSolido } from "@/components/dado-solido";
import { TIPOS, valorDaRolagem, type FacesDado, type TipoDado } from "@/lib/dados-tipos";
import { arremessar, avancar, pintar, type Dado } from "@/lib/dado-arremesso";

/** Raio de referência do dado na tela, em pixel. Cada tipo ajusta em cima. */
const RAIO = 26;

/** Quantas rolagens o histórico guarda. */
const HISTORICO = 8;

type Rolagem = { id: string; nome: string; hex: string; valor: number };

/**
 * `performance.now()` embrulhado: a regra de pureza do React barra chamada
 * impura no corpo do componente, e ela não distingue corpo de manipulador.
 */
function agora() {
  return performance.now();
}

type NaMao = {
  tipo: TipoDado;
  /** O dado que está sendo segurado, já montado: pintá-lo é só movê-lo. */
  dado: Dado;
  x: number;
  y: number;
  /** Amostras recentes do ponteiro, para tirar a velocidade do arremesso. */
  rastro: Array<{ x: number; y: number; t: number }>;
};

/** Um dado parado na mão, um palmo acima do plano da página. */
function naMaoDe(tipo: TipoDado, x: number, y: number): NaMao {
  const dado = arremessar(tipo, x, y, 0, 0, RAIO * tipo.escala);
  dado.altura = 34;
  dado.vAltura = 0;
  dado.parado = true;

  return { tipo, dado, x, y, rastro: [{ x, y, t: agora() }] };
}

/**
 * O saquinho de dados do site.
 *
 * Mesmo modelo do saquinho do ATO20: o valor é sorteado no ARREMESSO, e a
 * animação é levada até a orientação que mostra aquela face — ver `poseDaFace`.
 * Física decidindo o número daria um número que só existe no quadro em que o
 * dado parou: não dá pra conferir nem pra repetir.
 *
 * Canvas e não DOM: são até dezenas de dados, cada um com até vinte faces
 * repintadas por quadro. Em `<polygon>` isso viraria centenas de nós mudando de
 * atributo a 60 quadros por segundo.
 */
export function Saquinho() {
  const [aberto, setAberto] = useState(false);
  const [quantos, setQuantos] = useState(0);
  const [soma, setSoma] = useState(0);
  const [historico, setHistorico] = useState<Rolagem[]>([]);
  const painel = useId();

  const tela = useRef<HTMLCanvasElement>(null);
  const dados = useRef<Dado[]>([]);
  const naMao = useRef<NaMao | null>(null);
  /** Acorda o laço. Fica em ref porque quem o define é o efeito da tela. */
  const acordar = useRef<() => void>(() => {});

  const recontar = useCallback(() => {
    const lista = dados.current;
    setQuantos(lista.length);
    setSoma(
      lista.reduce(
        (total, dado) => total + valorDaRolagem(dado.tipo.faces as FacesDado, dado.gravado),
        0,
      ),
    );
  }, []);

  /**
   * O laço mora todo dentro do efeito.
   *
   * Fora dele, `desenhar` teria de se referenciar dentro da própria declaração
   * pra agendar o quadro seguinte — o que o React proíbe num `useCallback`.
   * Aqui `quadro` e `ultimo` são variáveis locais, e a limpeza cancela sozinha.
   */
  useEffect(() => {
    const canvas = tela.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let quadro = 0;
    let ultimo = 0;

    function desenhar() {
      if (!canvas || !ctx) return;

      const instante = agora();
      // Teto no passo: aba em segundo plano devolve um salto de segundos, e o
      // dado atravessaria a tela num quadro só.
      const dt = Math.min(0.032, (instante - ultimo) / 1000 || 0.016);
      ultimo = instante;

      const largura = canvas.clientWidth;
      const altura = canvas.clientHeight;
      ctx.clearRect(0, 0, largura, altura);

      let vivo = false;
      for (const dado of dados.current) {
        if (avancar(dado, dt, largura, altura)) vivo = true;
        pintar(ctx, dado);
      }

      const mao = naMao.current;
      if (mao) {
        vivo = true;
        pintar(ctx, mao.dado);
      }

      if (vivo) {
        quadro = requestAnimationFrame(desenhar);
      } else {
        quadro = 0;
        recontar();
      }
    }

    function despertar() {
      if (quadro) return;
      ultimo = agora();
      quadro = requestAnimationFrame(desenhar);
    }

    acordar.current = despertar;

    // A tela acompanha a janela, em pixel de dispositivo.
    function medir() {
      if (!canvas || !ctx) return;
      const proporcao = window.devicePixelRatio || 1;
      canvas.width = Math.round(window.innerWidth * proporcao);
      canvas.height = Math.round(window.innerHeight * proporcao);
      ctx.setTransform(proporcao, 0, 0, proporcao, 0, 0);
      despertar();
    }

    medir();
    window.addEventListener("resize", medir);
    return () => {
      window.removeEventListener("resize", medir);
      cancelAnimationFrame(quadro);
    };
  }, [recontar]);

  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") setAberto(false);
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [aberto]);

  const soltar = useCallback(() => {
    const mao = naMao.current;
    if (!mao) return;
    naMao.current = null;

    // A velocidade sai do fim do arrasto, não da média do caminho todo — o
    // gesto que importa é o último.
    const rastro = mao.rastro;
    const fim = rastro.at(-1);
    const antes = rastro.at(-4) ?? rastro[0];

    // Parou antes de soltar? Então foi pousar, não arremessar. Sem isto, quem
    // arrasta rápido, para e solta ainda lança o dado longe.
    const parado = !fim || agora() - fim.t > 90;

    const dt = fim && antes ? Math.max(0.016, (fim.t - antes.t) / 1000) : 1;
    const vx = parado || !fim || !antes ? 0 : (fim.x - antes.x) / dt;
    const vy = parado || !fim || !antes ? 0 : (fim.y - antes.y) / dt;

    const limite = 2200;
    const forca = Math.hypot(vx, vy);
    const escala = forca > limite ? limite / forca : 1;

    const dado = arremessar(
      mao.tipo,
      mao.x,
      mao.y,
      vx * escala,
      vy * escala,
      RAIO * mao.tipo.escala,
    );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      dado.altura = 0;
      dado.vAltura = 0;
      dado.vx = 0;
      dado.vy = 0;
      dado.batidas = 99;
    }

    dados.current = [...dados.current, dado];
    setHistorico((atual) =>
      [
        {
          id: dado.id,
          nome: dado.tipo.nome,
          hex: dado.tipo.hex,
          valor: valorDaRolagem(dado.tipo.faces as FacesDado, dado.gravado),
        },
        ...atual,
      ].slice(0, HISTORICO),
    );
    recontar();
    acordar.current();
  }, [recontar]);

  // Arrastar e soltar valem na janela inteira: o dado sai do saquinho e vai
  // para qualquer lugar da página.
  useEffect(() => {
    const aoMover = (evento: PointerEvent) => {
      const mao = naMao.current;
      if (!mao) return;
      evento.preventDefault();

      mao.x = evento.clientX;
      mao.y = evento.clientY;
      mao.dado.x = evento.clientX;
      mao.dado.y = evento.clientY;
      mao.rastro.push({ x: evento.clientX, y: evento.clientY, t: agora() });
      if (mao.rastro.length > 6) mao.rastro.shift();
      acordar.current();
    };

    const aoSoltar = () => soltar();

    // Pegar de volta um dado já pousado, como no app.
    const aoDescer = (evento: PointerEvent) => {
      if (naMao.current) return;

      const alvo = [...dados.current]
        .reverse()
        .find(
          (dado) =>
            Math.hypot(dado.x - evento.clientX, dado.y - evento.clientY) < dado.raio * 1.15,
        );
      if (!alvo) return;

      evento.preventDefault();
      dados.current = dados.current.filter((dado) => dado !== alvo);
      naMao.current = naMaoDe(alvo.tipo, evento.clientX, evento.clientY);
      recontar();
      acordar.current();
    };

    window.addEventListener("pointerdown", aoDescer);
    window.addEventListener("pointermove", aoMover, { passive: false });
    window.addEventListener("pointerup", aoSoltar);
    window.addEventListener("pointercancel", aoSoltar);
    return () => {
      window.removeEventListener("pointerdown", aoDescer);
      window.removeEventListener("pointermove", aoMover);
      window.removeEventListener("pointerup", aoSoltar);
      window.removeEventListener("pointercancel", aoSoltar);
    };
  }, [recontar, soltar]);

  function pegar(tipo: TipoDado, evento: React.PointerEvent) {
    evento.preventDefault();
    naMao.current = naMaoDe(tipo, evento.clientX, evento.clientY);
    acordar.current();
  }

  function recolher() {
    dados.current = [];
    recontar();
    acordar.current();
  }

  return (
    <>
      <canvas
        ref={tela}
        className="pointer-events-none fixed inset-0 z-40 size-full"
        aria-hidden
      />

      <div className="fixed right-4 bottom-4 z-50 text-xs">
        {aberto ? (
          <div
            id={painel}
            className="absolute right-0 bottom-full mb-2 w-60 rounded-xl border border-border bg-background/95 p-3 shadow-2xl shadow-black/70 backdrop-blur"
          >
            <p className="font-mono text-sm text-foreground">Saquinho</p>
            <p className="mt-0.5 text-muted-foreground">
              Arraste um dado para a página e solte para rolar.
            </p>

            <div className="mt-3 grid grid-cols-3 gap-1">
              {TIPOS.map((tipo) => (
                <button
                  key={tipo.nome}
                  type="button"
                  aria-label={`Pegar ${tipo.nome}`}
                  onPointerDown={(evento) => pegar(tipo, evento)}
                  className="grid touch-none cursor-grab place-items-center gap-1 rounded-md py-1.5 transition-transform hover:scale-105 hover:bg-muted active:cursor-grabbing"
                >
                  <DadoSolido
                    tipo={tipo}
                    className="h-8"
                    style={{ width: `${2 * tipo.escala}rem` }}
                  />
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {tipo.nome}
                  </span>
                </button>
              ))}
            </div>

            {quantos > 0 ? (
              <div className="mt-3 flex items-baseline gap-2 border-t border-border pt-2.5">
                <span className="flex-1 text-muted-foreground">Na mesa</span>
                <span className="font-mono text-muted-foreground">{quantos}</span>
                <span className="font-mono text-base leading-none font-semibold tabular-nums">
                  {soma}
                </span>
              </div>
            ) : null}

            {historico.length > 0 ? (
              <ul className="mt-2 space-y-0.5 border-t border-border pt-2">
                {historico.map(({ id, nome, hex, valor }) => (
                  <li key={id} className="flex items-center gap-2">
                    <span
                      className="size-2 shrink-0 rounded-full"
                      style={{ backgroundColor: hex }}
                    />
                    <span className="flex-1 font-mono text-muted-foreground">{nome}</span>
                    <span className="font-mono tabular-nums">{valor}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {quantos > 0 ? (
              <button
                type="button"
                onClick={recolher}
                className="mt-2 flex w-full items-center gap-1.5 border-t border-border pt-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-3" strokeWidth={1.75} />
                Recolher os dados
              </button>
            ) : null}
          </div>
        ) : null}

        <button
          type="button"
          aria-label="Saquinho de dados"
          aria-expanded={aberto}
          aria-controls={aberto ? painel : undefined}
          onClick={() => setAberto((estava) => !estava)}
          className="relative grid size-11 place-items-center rounded-full border border-border bg-background/85 text-muted-foreground backdrop-blur transition-colors hover:border-foreground/30 hover:text-foreground"
        >
          <Dices className="size-5" strokeWidth={1.75} />
          {quantos > 0 ? (
            <span className="absolute -top-1 -right-1 grid size-5 place-items-center rounded-full bg-foreground font-mono text-[10px] font-semibold text-background tabular-nums">
              {quantos}
            </span>
          ) : null}
        </button>
      </div>
    </>
  );
}
