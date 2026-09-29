"use client";

import {
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";

import { Palco } from "@/components/palco-demo";
import { useMenosMovimento } from "@/lib/movimento";

type Posicao = { x: number; y: number };

/**
 * As câmeras da cena, em fração do palco.
 *
 * O palco é 16:9 e a câmera também — é o recorte que o aplicativo nunca deixa
 * sair de 16:9 —, então uma fração só serve de largura e de altura. Os pontos
 * miram o que o mapa da taverna tem de legível em cada canto: a porta e o
 * armário no alto, o balcão sob a luz, e o porão com a área escondida, que a
 * janela do espectador recebe como preto sólido.
 */
const CAMERAS = [
  { nome: "Entrada", x: 0.5, y: 0.06, tamanho: 0.34 },
  { nome: "Balcão", x: 0.175, y: 0.32, tamanho: 0.36 },
  { nome: "Porão", x: 0.54, y: 0.6, tamanho: 0.34 },
];

const BASE: Posicao[] = CAMERAS.map(({ x, y }) => ({ x, y }));

type Passo = {
  noAr: number;
  duracao: number;
  /** O mestre segurando V: a câmera no ar anda até aqui. */
  cinegrafista?: Posicao;
  /** Devolve as câmeras aos enquadramentos guardados, antes de recomeçar. */
  reiniciar?: boolean;
};

/**
 * O que a demonstração faz sozinha: dois cortes e uma volta de cinegrafista.
 * É a sessão de verdade em quinze segundos — trocar de câmera é o gesto
 * comum, e o V é o que o resto dos VTTs não tem.
 */
const ROTEIRO: Passo[] = [
  { noAr: 1, duracao: 3200, reiniciar: true },
  { noAr: 2, duracao: 3200 },
  { noAr: 0, duracao: 2400 },
  { noAr: 0, duracao: 1600, cinegrafista: { x: 0.38, y: 0.12 } },
  { noAr: 0, duracao: 1600, cinegrafista: { x: 0.3, y: 0.24 } },
  { noAr: 0, duracao: 2000, cinegrafista: { x: 0.44, y: 0.2 } },
];

/** O corte na janela do espectador: some, troca, volta. */
const FADE_MS = 220;
/** Quanto a moldura leva entre dois pontos do cinegrafista. */
const PASSEIO_MS = 1400;
/**
 * O que o espectador leva para alcançar a câmera enquanto a mão arrasta. É o
 * mesmo número do aplicativo: o espectador recebe amostras e desliza até cada uma em 450 ms
 * com desaceleração, e o Mestre não interpola nada — lá o arrasto é
 * manipulação direta.
 */
const ESPECTADOR_MS = 450;
/** Depois de a pessoa mexer, quanto a demonstração espera para voltar sozinha. */
const RETOMAR_MS = 8000;

const DESACELERA = "cubic-bezier(0.16, 1, 0.3, 1)";

const pct = (fracao: number) => `${fracao * 100}%`;

function limitar({ x, y }: Posicao, tamanho: number): Posicao {
  const teto = 1 - tamanho;
  return {
    x: Math.min(Math.max(x, 0), teto),
    y: Math.min(Math.max(y, 0), teto),
  };
}

/**
 * A câmera do ATO20, em miniatura: o palco do mestre com três enquadramentos
 * guardados, e a janela do espectador mostrando só o que está no ar.
 *
 * O espectador não é um segundo desenho — é o mesmo `Palco`, ampliado e
 * deslocado pelo retângulo da câmera, que é a conta que o Espectador faz de
 * verdade. Por isso ele nunca mostra nada além do que está dentro da moldura:
 * não existe uma imagem do espectador para ficar diferente da do mestre.
 *
 * Ele é desenhado como janela de navegador, e não como TV, porque é isso que
 * ele é: qualquer tela com navegador na rede — TV, monitor, projetor, outro
 * notebook. Um aparelho de TV no desenho ensinaria que é só na TV.
 *
 * Sozinha, ela percorre o `ROTEIRO`. Quem arrasta uma moldura ou clica numa
 * câmera assume, e a demonstração volta a andar oito segundos depois do último
 * gesto. Fora da tela ela para, e com `prefers-reduced-motion` ela nunca anda
 * sozinha: corte e deslize viram troca seca, e só a mão move a câmera.
 */
export function DemoCamera() {
  const reduzir = useMenosMovimento();

  const [posicoes, setPosicoes] = useState<Posicao[]>(BASE);
  const [noAr, setNoAr] = useState(ROTEIRO[0].noAr);
  /** A câmera que o espectador mostra. Só alcança `noAr` depois do fade. */
  const [noEspectador, setNoEspectador] = useState(ROTEIRO[0].noAr);
  const [apagada, setApagada] = useState(false);
  const [passo, setPasso] = useState(0);
  const [cinegrafista, setCinegrafista] = useState(false);
  const [arrastando, setArrastando] = useState(false);
  const [automatico, setAutomatico] = useState(true);
  const [visivel, setVisivel] = useState(false);

  const raiz = useRef<HTMLElement>(null);
  const palco = useRef<HTMLDivElement>(null);
  const noEspectadorAtual = useRef(noEspectador);
  const corte = useRef<number | undefined>(undefined);
  const retomada = useRef<number | undefined>(undefined);
  const arrasto = useRef<{
    indice: number;
    inicio: Posicao;
    ponteiro: Posicao;
    caixa: { largura: number; altura: number };
  } | null>(null);

  function trocar(indice: number) {
    setNoAr(indice);
    window.clearTimeout(corte.current);
    if (noEspectadorAtual.current === indice) {
      setApagada(false);
      return;
    }

    const entrar = () => {
      noEspectadorAtual.current = indice;
      setNoEspectador(indice);
      setApagada(false);
    };

    if (reduzir) {
      entrar();
      return;
    }

    setApagada(true);
    corte.current = window.setTimeout(entrar, FADE_MS);
  }

  /** A pessoa pegou o controle: a demonstração para, e volta sozinha depois. */
  function assumir() {
    setAutomatico(false);
    setCinegrafista(false);
    window.clearTimeout(retomada.current);
    retomada.current = window.setTimeout(() => setAutomatico(true), RETOMAR_MS);
  }

  const avancar = useEffectEvent(() => {
    const proximo = (passo + 1) % ROTEIRO.length;
    const { noAr: camera, cinegrafista: destino, reiniciar } = ROTEIRO[proximo];

    if (reiniciar) setPosicoes(BASE);
    trocar(camera);
    setCinegrafista(Boolean(destino));
    if (destino) {
      setPosicoes((atuais) =>
        atuais.map((posicao, indice) =>
          indice === camera ? limitar(destino, CAMERAS[indice].tamanho) : posicao,
        ),
      );
    }
    setPasso(proximo);
  });

  useEffect(() => {
    if (!automatico || !visivel || reduzir) return;

    const id = window.setTimeout(avancar, ROTEIRO[passo].duracao);
    return () => window.clearTimeout(id);
  }, [passo, automatico, visivel, reduzir]);

  useEffect(() => {
    const elemento = raiz.current;
    if (!elemento) return;

    const observador = new IntersectionObserver(
      ([entrada]) => setVisivel(entrada.isIntersecting),
      { threshold: 0.3 },
    );
    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  useEffect(
    () => () => {
      window.clearTimeout(corte.current);
      window.clearTimeout(retomada.current);
    },
    [],
  );

  function pegar(evento: PointerEvent<HTMLDivElement>, indice: number) {
    const caixa = palco.current?.getBoundingClientRect();
    if (!caixa) return;

    assumir();
    trocar(indice);
    evento.currentTarget.setPointerCapture(evento.pointerId);
    arrasto.current = {
      indice,
      inicio: posicoes[indice],
      ponteiro: { x: evento.clientX, y: evento.clientY },
      caixa: { largura: caixa.width, altura: caixa.height },
    };
    setArrastando(true);
  }

  function mover(evento: PointerEvent<HTMLDivElement>) {
    const atual = arrasto.current;
    if (!atual) return;

    const destino = limitar(
      {
        x: atual.inicio.x + (evento.clientX - atual.ponteiro.x) / atual.caixa.largura,
        y: atual.inicio.y + (evento.clientY - atual.ponteiro.y) / atual.caixa.altura,
      },
      CAMERAS[atual.indice].tamanho,
    );
    setPosicoes((atuais) =>
      atuais.map((posicao, indice) => (indice === atual.indice ? destino : posicao)),
    );
  }

  function soltar() {
    if (!arrasto.current) return;
    arrasto.current = null;
    setArrastando(false);
    assumir();
  }

  /** Setas andam com a câmera focada, e Enter a põe no ar. */
  function teclar(evento: KeyboardEvent<HTMLDivElement>, indice: number) {
    if (evento.key === "Enter" || evento.key === " ") {
      evento.preventDefault();
      assumir();
      trocar(indice);
      return;
    }

    const passoDaSeta = evento.shiftKey ? 0.06 : 0.02;
    const deslocamento: Record<string, Posicao> = {
      ArrowLeft: { x: -passoDaSeta, y: 0 },
      ArrowRight: { x: passoDaSeta, y: 0 },
      ArrowUp: { x: 0, y: -passoDaSeta },
      ArrowDown: { x: 0, y: passoDaSeta },
    };
    const delta = deslocamento[evento.key];
    if (!delta) return;

    evento.preventDefault();
    assumir();
    trocar(indice);
    setPosicoes((atuais) =>
      atuais.map((posicao, i) =>
        i === indice
          ? limitar({ x: posicao.x + delta.x, y: posicao.y + delta.y }, CAMERAS[i].tamanho)
          : posicao,
      ),
    );
  }

  // Na mão, a moldura é manipulação direta e o espectador corre atrás em 450
  // ms. No roteiro, a moldura passeia e o espectador segue o mesmo caminho um instante
  // depois, que é como o atraso das amostras aparece na mesa.
  const transicaoDaMoldura = reduzir || arrastando
    ? "none"
    : `left ${PASSEIO_MS}ms ease-in-out, top ${PASSEIO_MS}ms ease-in-out`;
  const transicaoDoEspectador = reduzir
    ? "none"
    : arrastando
      ? ["left", "top"].map((p) => `${p} ${ESPECTADOR_MS}ms ${DESACELERA}`).join(", ")
      : ["left", "top"].map((p) => `${p} ${PASSEIO_MS}ms ease-in-out 150ms`).join(", ");

  const naTela = posicoes[noEspectador];
  const tamanhoNaTela = CAMERAS[noEspectador].tamanho;
  const pedeAtencao = cinegrafista || arrastando;

  const alca = "absolute size-1.5 border border-foreground/80 bg-background";

  return (
    <figure
      ref={raiz}
      aria-label="Demonstração da câmera: o palco do mestre e a janela do espectador"
      className="m-0"
    >
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] xl:items-center xl:gap-12">
        <div className="min-w-0">
          <p className="mb-2 flex items-center justify-between font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase">
            <span>mestre</span>
            <span className="normal-case tracking-normal">Taverna do Javali</span>
          </p>

          <div className="rounded-xl border border-border bg-muted/40 p-2 shadow-2xl shadow-black/60 backdrop-blur-sm">
            <div
              ref={palco}
              className="relative aspect-video overflow-hidden rounded-md border border-border/60 bg-[oklch(0.105_0_0)]"
            >
              <div className="absolute inset-0">
                <Palco prefixo="camera-mestre" />
              </div>

              {CAMERAS.map(({ nome, tamanho }, indice) => {
                const { x, y } = posicoes[indice];
                const ativa = indice === noAr;
                const estilo: CSSProperties = {
                  left: pct(x),
                  top: pct(y),
                  width: pct(tamanho),
                  height: pct(tamanho),
                  transition: transicaoDaMoldura,
                  // A máscara do aplicativo: fora do que está no ar, o palco
                  // escurece. Ela é a sombra da moldura ativa, e por isso cobre
                  // também as outras câmeras — apagadas, como lá.
                  boxShadow: ativa ? "0 0 0 100vmax oklch(0 0 0 / 0.42)" : undefined,
                };

                return (
                  <div
                    key={nome}
                    role="button"
                    tabIndex={0}
                    aria-pressed={ativa}
                    aria-label={`Câmera ${nome}. Arraste ou use as setas para mover o enquadramento.`}
                    onPointerDown={(evento) => pegar(evento, indice)}
                    onPointerMove={mover}
                    onPointerUp={soltar}
                    onPointerCancel={soltar}
                    onKeyDown={(evento) => teclar(evento, indice)}
                    style={estilo}
                    className={`absolute cursor-grab touch-none outline-none focus-visible:ring-1 focus-visible:ring-accent active:cursor-grabbing ${
                      ativa ? "z-20" : "z-10"
                    }`}
                  >
                    <span
                      className={`absolute inset-0 border ${
                        ativa ? "border-foreground/80" : "border-dashed border-foreground/30"
                      }`}
                    />
                    {ativa ? (
                      <>
                        <span className={`${alca} -top-[3px] -left-[3px]`} />
                        <span className={`${alca} -top-[3px] -right-[3px]`} />
                        <span className={`${alca} -bottom-[3px] -left-[3px]`} />
                        <span className={`${alca} -right-[3px] -bottom-[3px]`} />
                      </>
                    ) : null}
                    <span
                      className={`absolute top-1 left-1 flex items-center gap-1 rounded border px-1 py-0.5 font-mono text-[0.6rem] whitespace-nowrap ${
                        ativa
                          ? "border-border bg-background/90 text-foreground"
                          : "border-transparent text-muted-foreground"
                      }`}
                    >
                      {ativa ? (
                        <span className="size-1.5 rounded-full bg-[oklch(0.62_0.19_25)]" />
                      ) : null}
                      {nome}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* A pílula mora embaixo, no canto do palco, como no aplicativo:
                transmitir é escolher uma câmera nela. O V fica do outro lado,
                porque é tecla, e não botão. */}
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span
                className={`flex items-center gap-1.5 font-mono text-[0.65rem] transition-colors ${
                  pedeAtencao ? "text-accent" : "text-muted-foreground"
                }`}
              >
                <kbd
                  className={`grid size-5 place-items-center rounded border font-mono text-[0.65rem] transition-colors ${
                    pedeAtencao
                      ? "border-accent bg-accent/15 text-accent"
                      : "border-border bg-background/80"
                  }`}
                >
                  V
                </kbd>
                cinegrafista
              </span>
              <div
                role="group"
                aria-label="Câmeras da cena"
                className="ml-auto flex items-center gap-0.5 rounded-lg border border-border bg-background/80 p-0.5"
              >
                {CAMERAS.map(({ nome }, indice) => {
                  const ativa = indice === noAr;
                  return (
                    <button
                      key={nome}
                      type="button"
                      aria-pressed={ativa}
                      onClick={() => {
                        assumir();
                        trocar(indice);
                      }}
                      className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-xs transition-colors ${
                        ativa
                          ? "bg-foreground text-background"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span className={`font-mono text-[0.65rem] ${ativa ? "opacity-60" : ""}`}>
                        {indice + 1}
                      </span>
                      {nome}
                    </button>
                  );
                })}
              </div>

            </div>

          </div>
        </div>

        <div className="mx-auto w-full max-w-md min-w-0 xl:max-w-none">
          <p className="mb-2 flex items-center justify-between font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase">
            <span>espectador</span>
            <span className="flex items-center gap-1.5 normal-case tracking-normal">
              <span className="size-1.5 rounded-full bg-[oklch(0.62_0.19_25)]" />
              no ar: {CAMERAS[noAr].nome}
            </span>
          </p>

          <div className="overflow-hidden rounded-xl border border-border bg-[oklch(0.09_0_0)] shadow-2xl shadow-black/60">
            {/* A barra de um navegador qualquer, com o endereço que o Mestre
                mostra no QR: o espectador é uma página, e abre onde houver
                navegador. */}
            <div aria-hidden className="flex h-7 items-center gap-2 border-b border-border px-2.5">
              <span className="flex gap-1">
                <span className="size-2 rounded-full bg-border" />
                <span className="size-2 rounded-full bg-border" />
                <span className="size-2 rounded-full bg-border" />
              </span>
              <span className="mx-auto truncate rounded bg-muted/60 px-2 py-0.5 font-mono text-[0.6rem] text-muted-foreground">
                192.168.0.12:20200/espectador
              </span>
            </div>
            <div aria-hidden className="relative aspect-video overflow-hidden bg-black">
              <div
                className="absolute inset-0"
                style={{
                  opacity: apagada ? 0 : 1,
                  transition: reduzir ? "none" : `opacity ${FADE_MS}ms ease`,
                }}
              >
                {/* A chave remonta a camada no corte: a câmera nova entra no
                    lugar, sem deslizar do enquadramento da anterior por baixo
                    do fade. */}
                <div
                  key={noEspectador}
                  className="absolute"
                  style={{
                    left: pct(-naTela.x / tamanhoNaTela),
                    top: pct(-naTela.y / tamanhoNaTela),
                    width: pct(1 / tamanhoNaTela),
                    height: pct(1 / tamanhoNaTela),
                    transition: transicaoDoEspectador,
                  }}
                >
                  <Palco prefixo="camera-espectador" mesa />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <figcaption className="mt-6 text-center font-mono text-xs text-muted-foreground">
        arraste a moldura, ou troque de câmera na pílula
      </figcaption>
    </figure>
  );
}
