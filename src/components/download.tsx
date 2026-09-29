"use client";

import {
  type ComponentType,
  type MouseEvent,
  type RefObject,
  useRef,
  useSyncExternalStore,
} from "react";

import Link from "next/link";

import { ArrowUpRight, Download as IconeBaixar, Smartphone, Terminal, X } from "lucide-react";

import { ComandoDeDownload } from "@/components/comando-de-download";
import {
  MarcaAndroid,
  MarcaApple,
  MarcaWindows,
} from "@/components/marcas";
import { formatarTamanho } from "@/lib/formatos";
import {
  PLATAFORMAS,
  PREVISOES,
  type PlataformaId,
  arquivoPrincipal,
  arquivosAlternativos,
  detectarPlataforma,
} from "@/lib/plataformas";
import { ULTIMA_RELEASE } from "@/lib/releases";

/**
 * O Linux fica com o terminal do lucide porque não existe logo de traço do Tux:
 * o simple-icons só tem a versão preenchida e detalhada, que destoa do resto.
 * Apple cobre macOS e iOS — é a mesma marca.
 */
const ICONES: Record<PlataformaId, ComponentType<React.SVGProps<SVGSVGElement>>> = {
  linux: Terminal,
  windows: MarcaWindows,
  macos: MarcaApple,
  android: MarcaAndroid,
  ios: MarcaApple,
};

const ESTILO_BOTAO =
  "group inline-flex h-12 items-center justify-center gap-2.5 rounded-lg bg-foreground px-5 text-sm font-medium whitespace-nowrap text-background transition-opacity aria-disabled:cursor-not-allowed aria-disabled:opacity-60";

/** A plataforma nunca muda depois de detectada, então não há o que assinar. */
const naoInscrever = () => () => {};
const lerNoServidor = (): PlataformaId | null => null;

/** Os sistemas em que o mestre instala o aplicativo, na ordem da janela. */
const DE_COMPUTADOR: PlataformaId[] = ["linux", "windows", "macos"];

/**
 * O que a linha embaixo do botão diz quando o sistema de quem visita ainda não
 * tem pacote. No celular a resposta não é "espere": é que o celular já joga,
 * pelo navegador — quem instala é só o mestre.
 */
function avisoSemPacote(id: PlataformaId): string {
  if (id === "android" || id === "ios") {
    return "no celular, quem joga entra pelo navegador";
  }
  return `${PLATAFORMAS[id].nome} ainda não tem pacote`;
}

/**
 * `simples` é o botão sozinho, pro fecho da página: lá a pessoa já leu tudo e
 * só falta baixar.
 *
 * `children` entra na mesma linha dos botões, depois deles: é o lugar do
 * atalho de quem ainda não vai baixar.
 *
 * O hero carrega o mínimo: o botão do sistema de quem visita e uma linha com
 * versão, formato e tamanho. As outras plataformas, os outros formatos e o
 * comando de terminal moram na janela de downloads — são úteis, mas respondem
 * "qual arquivo?", e o hero responde "o que é isso?" e "onde começo?".
 */
export function Download({
  simples = false,
  children,
}: { simples?: boolean; children?: React.ReactNode } = {}) {
  // O sistema só é conhecido no cliente: no servidor o snapshot é `null`, então
  // o HTML renderizado e a primeira renderização do cliente batem, e a detecção
  // aparece logo depois da hidratação.
  const detectada = useSyncExternalStore(
    naoInscrever,
    detectarPlataforma,
    lerNoServidor,
  );
  const dialogo = useRef<HTMLDialogElement>(null);

  const plataforma = detectada ? PLATAFORMAS[detectada] : null;
  // Antes de saber o sistema, a seta de download diz o que o botão faz.
  const IconeDoBotao = detectada ? ICONES[detectada] : IconeBaixar;
  const arquivo = detectada ? arquivoPrincipal(detectada) : null;

  const abrir = () => dialogo.current?.showModal();

  return (
    <div className="mt-10">
      {/* Com o atalho do hero são três itens, e a coluna do xl não cabe os
          três: quebra a linha em vez do texto, e o atalho desce sozinho. */}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        {arquivo ? (
          <a href={arquivo.url} download className={ESTILO_BOTAO}>
            <IconeDoBotao className="size-4" strokeWidth={1.75} />
            Baixar para {plataforma?.nome}
          </a>
        ) : !detectada ? (
          // Antes da hidratação o sistema ainda não é conhecido, e este é o
          // botão que o HTML pré-renderizado carrega — o que o buscador, a
          // prévia de link e quem abre sem JavaScript enxergam. A lista de
          // releases serve qualquer sistema, e não precisa de script.
          <Link href="/releases" className={ESTILO_BOTAO}>
            <IconeDoBotao className="size-4" strokeWidth={1.75} />
            Baixar o ATO20
          </Link>
        ) : (
          // Sistema sem pacote (macOS, celular): o botão não finge que baixa.
          // Ele abre os downloads, e a linha de baixo diz por quê.
          <button type="button" onClick={abrir} className={ESTILO_BOTAO}>
            <IconeBaixar className="size-4" strokeWidth={1.75} />
            Baixar o ATO20
          </button>
        )}

        {simples ? null : (
          <Link
            href="/releases"
            className="inline-flex h-12 items-center justify-center gap-1.5 rounded-lg border border-border px-5 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
          >
            Notas de atualização
            <ArrowUpRight className="size-4" strokeWidth={1.75} />
          </Link>
        )}

        {children}
      </div>

      {/* No fecho a versão já aparece na assinatura, embaixo. */}
      {simples ? null : (
        <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-muted-foreground">
          {ULTIMA_RELEASE ? (
            <span className="text-accent">{ULTIMA_RELEASE.tag}</span>
          ) : null}
          {arquivo && plataforma ? (
            <>
              <span className="text-border">·</span>
              {plataforma.formato}
              <span className="text-border">·</span>
              {formatarTamanho(arquivo.bytes)}
            </>
          ) : detectada ? (
            <>
              <span className="text-border">·</span>
              {avisoSemPacote(detectada)}
            </>
          ) : null}
          <span className="text-border">·</span>
          <button
            type="button"
            onClick={abrir}
            className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
          >
            outras plataformas
          </button>
        </p>
      )}

      <JanelaDeDownloads dialogo={dialogo} />
    </div>
  );
}

/** Um sistema que a release já publica: os arquivos dele e o comando. */
function LinhaDisponivel({ id }: { id: PlataformaId }) {
  const principal = arquivoPrincipal(id);
  if (!principal) return null;

  const { nome, formato } = PLATAFORMAS[id];
  const Icone = ICONES[id];
  const arquivos = [
    { rotulo: formato, arquivo: principal },
    ...arquivosAlternativos(id).map((arquivo) => ({
      rotulo: `.${arquivo.nome.split(".").pop()}`,
      arquivo,
    })),
  ];

  return (
    <li className="py-5">
      <p className="flex items-center gap-2 text-sm font-medium">
        <Icone className="size-4 text-muted-foreground" strokeWidth={1.75} />
        {nome}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {arquivos.map(({ rotulo, arquivo }) => (
          <a
            key={arquivo.nome}
            href={arquivo.url}
            download
            title={arquivo.nome}
            className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 font-mono text-xs transition-colors hover:border-foreground/30"
          >
            <IconeBaixar className="size-3.5 text-muted-foreground" strokeWidth={1.75} />
            {rotulo}
            <span className="text-muted-foreground">{formatarTamanho(arquivo.bytes)}</span>
          </a>
        ))}
      </div>
      {/* O caminho de quem já mora no terminal. Fica aqui, e não no hero:
          é detalhe de instalação, e o botão é o de todo mundo. */}
      <ComandoDeDownload plataforma={id} url={principal.url} />
    </li>
  );
}

/**
 * Todos os downloads, numa janela que só abre quando alguém pede.
 *
 * Um `<dialog>` de verdade, como a tela cheia das capturas: o Escape, o foco
 * preso dentro e o resto da página inerte vêm do navegador.
 *
 * O celular não entra como plataforma a baixar. Ele entra como o que ele é
 * hoje — a tela de quem joga, pelo navegador —, porque listar Android e iOS ao
 * lado do Linux faria parecer que o ATO20 é um aplicativo de celular, e o que
 * falta ali é o Mestre, não o Jogador.
 */
function JanelaDeDownloads({ dialogo }: { dialogo: RefObject<HTMLDialogElement | null> }) {
  // O alvo do clique só é o próprio `<dialog>` quando o clique cai no fundo:
  // qualquer coisa dentro dele é filha, e aí o alvo é outro.
  function fecharPeloFundo(evento: MouseEvent<HTMLDialogElement>) {
    if (evento.target === dialogo.current) dialogo.current?.close();
  }

  return (
    <dialog
      ref={dialogo}
      onClick={fecharPeloFundo}
      aria-labelledby="titulo-downloads"
      className="m-auto max-h-[88vh] w-[min(36rem,calc(100vw-2rem))] max-w-none overflow-y-auto rounded-xl border border-border bg-background p-0 text-foreground shadow-2xl shadow-black/60 backdrop:bg-black/75 backdrop:backdrop-blur-sm"
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="titulo-downloads" className="text-xl font-semibold tracking-tight">
              Downloads
            </h2>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              {ULTIMA_RELEASE ? (
                <span className="text-accent">{ULTIMA_RELEASE.tag}</span>
              ) : null}
              {ULTIMA_RELEASE ? " · " : null}o aplicativo do mestre
            </p>
          </div>
          <button
            type="button"
            onClick={() => dialogo.current?.close()}
            aria-label="Fechar"
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-4" strokeWidth={1.75} />
          </button>
        </div>

        <ul className="mt-4 divide-y divide-border">
          {DE_COMPUTADOR.map((id) =>
            arquivoPrincipal(id) ? (
              <LinhaDisponivel key={id} id={id} />
            ) : (
              <LinhaPlanejada key={id} id={id} />
            ),
          )}

          <li className="py-5">
            <p className="flex items-center gap-2 text-sm font-medium">
              <Smartphone className="size-4 text-muted-foreground" strokeWidth={1.75} />
              Celular
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
              Quem joga entra pelo navegador do celular, sem instalar nada: é o
              aplicativo do mestre que serve a tela, na rede da casa. O mestre
              no Android e no iOS está{" "}
              {PREVISOES[PLATAFORMAS.android.previsao]}.
            </p>
          </li>
        </ul>

        <p className="mt-4 border-t border-border pt-5 font-mono text-xs">
          <Link
            href="/releases"
            className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            todas as versões, com o que mudou em cada uma
            <ArrowUpRight className="size-3.5" strokeWidth={1.75} />
          </Link>
        </p>
      </div>
    </dialog>
  );
}

/** Um sistema de computador que ainda não tem pacote. */
function LinhaPlanejada({ id }: { id: PlataformaId }) {
  const { nome, previsao } = PLATAFORMAS[id];
  const Icone = ICONES[id];

  return (
    <li className="flex items-center justify-between gap-4 py-5">
      <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Icone className="size-4" strokeWidth={1.75} />
        {nome}
      </p>
      <span className="font-mono text-xs text-muted-foreground">{PREVISOES[previsao]}</span>
    </li>
  );
}
