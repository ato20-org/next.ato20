"use client";

import { type ComponentType, useState, useSyncExternalStore } from "react";

import Link from "next/link";

import { ArrowUpRight, Download as IconeBaixar, Terminal } from "lucide-react";

import {
  MarcaAndroid,
  MarcaApple,
  MarcaWindows,
} from "@/components/marcas";
import { formatarTamanho } from "@/lib/formatos";
import {
  ORDEM_PLATAFORMAS,
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
  "group inline-flex h-12 items-center justify-center gap-2.5 rounded-lg bg-foreground px-5 text-sm font-medium text-background transition-opacity aria-disabled:cursor-not-allowed aria-disabled:opacity-60";

/** A plataforma nunca muda depois de detectada, então não há o que assinar. */
const naoInscrever = () => () => {};
const lerNoServidor = (): PlataformaId | null => null;

/**
 * `simples` é o botão sozinho, pro fecho da página: lá a pessoa já leu tudo e
 * só falta baixar — a lista de plataformas e os formatos alternativos já
 * apareceram uma vez, no hero.
 */
export function Download({ simples = false }: { simples?: boolean } = {}) {
  // O sistema só é conhecido no cliente: no servidor o snapshot é `null`, então
  // o HTML renderizado e a primeira renderização do cliente batem, e a detecção
  // aparece logo depois da hidratação.
  const detectada = useSyncExternalStore(
    naoInscrever,
    detectarPlataforma,
    lerNoServidor,
  );
  // A detecção erra em UA travado ou navegador atípico; o usuário pode trocar.
  const [trocada, setTrocada] = useState<PlataformaId | null>(null);

  const escolhida = trocada ?? detectada;
  const plataforma = escolhida ? PLATAFORMAS[escolhida] : null;
  // Antes de saber o sistema, a seta de download diz o que o botão faz.
  const IconeDoBotao = escolhida ? ICONES[escolhida] : IconeBaixar;

  const arquivo = escolhida ? arquivoPrincipal(escolhida) : null;
  const alternativos = escolhida ? arquivosAlternativos(escolhida) : [];

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {arquivo ? (
          <a href={arquivo.url} download className={ESTILO_BOTAO}>
            <IconeDoBotao className="size-4" strokeWidth={1.75} />
            Baixar para {plataforma?.nome}
          </a>
        ) : (
          <button
            type="button"
            // A release ainda não publica esta plataforma: o botão é a forma
            // final, sem ação, e a tag diz quando ela chega.
            aria-disabled
            className={ESTILO_BOTAO}
          >
            <IconeDoBotao className="size-4" strokeWidth={1.75} />
            {plataforma ? `Baixar para ${plataforma.nome}` : "Baixar o ATO20"}
            <span className="rounded border border-background/25 px-1.5 py-0.5 font-mono text-[0.65rem] tracking-wide uppercase">
              {PREVISOES[plataforma?.previsao ?? "em-breve"]}
            </span>
          </button>
        )}

        {simples ? null : (
          <Link
            href="/releases"
            className="inline-flex h-12 items-center justify-center gap-1.5 rounded-lg border border-border px-5 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
          >
            Notas de atualização
            <ArrowUpRight className="size-4" strokeWidth={1.75} />
          </Link>
        )}
      </div>

      {/* No fecho a versão já aparece na assinatura, embaixo. */}
      {simples ? null : (
      <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-muted-foreground">
        {ULTIMA_RELEASE ? (
          <span className="text-accent">{ULTIMA_RELEASE.tag}</span>
        ) : null}
        {arquivo ? (
          <>
            <span className="text-border">·</span>
            {arquivo.nome}
            <span className="text-border">·</span>
            {formatarTamanho(arquivo.bytes)}
          </>
        ) : (
          <>
            {ULTIMA_RELEASE ? <span className="text-border">·</span> : null}
            {plataforma ? plataforma.artefato : "detectando o seu sistema…"}
          </>
        )}
      </p>
      )}

      {alternativos.length > 0 && !simples ? (
        <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-muted-foreground">
          ou:
          {alternativos.map((outro) => (
            <a
              key={outro.nome}
              href={outro.url}
              download
              title={`${outro.nome} · ${formatarTamanho(outro.bytes)}`}
              className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
            >
              {/* O formato basta: o nome inteiro do arquivo já está acima. */}
              .{outro.nome.split(".").pop()}
            </a>
          ))}
        </p>
      ) : null}

      {simples ? null : (
        <div className="mt-6 flex flex-wrap items-center gap-x-1.5 gap-y-2">
          <span className="mr-1 font-mono text-xs text-muted-foreground">
            outros:
          </span>
          {ORDEM_PLATAFORMAS.map((id) => {
            const Icone = ICONES[id];
            const { nome, previsao } = PLATAFORMAS[id];
            // Só o prazo mais longo vira tag: o "em breve" do resto já está no
            // botão, e quem já tem build não tem prazo nenhum pra mostrar.
            const distante = previsao === "mais-pra-frente" && !arquivoPrincipal(id);

            return (
              <button
                key={id}
                type="button"
                onClick={() => setTrocada(id)}
                aria-pressed={escolhida === id}
                className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground aria-pressed:bg-muted aria-pressed:text-foreground"
              >
                <Icone className="size-3.5" strokeWidth={1.75} />
                {nome}
                {distante && (
                  <span className="rounded border border-border px-1 py-px text-[0.6rem] tracking-wide uppercase">
                    {PREVISOES[previsao]}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
