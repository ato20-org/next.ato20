"use client";

import { useEffect, useState } from "react";

import { Check, Copy } from "lucide-react";

import type { PlataformaId } from "@/lib/plataformas";

/**
 * O comando de terminal que baixa o aplicativo, pra quem prefere a linha ao
 * botão.
 *
 * A URL fixa a TAG da release, e não usa o atalho `releases/latest/download/`
 * do GitHub: esse atalho ignora pré-lançamento, e enquanto o ATO20 for alpha
 * ele responde 404 em todas as versões. Como a URL vem do `releases.ts`, que
 * nasce do `gerar:releases`, a tag se atualiza sozinha a cada versão — o que
 * seria o motivo de querer o `latest` está resolvido na geração, e não na hora
 * da visita.
 *
 * Só Linux e Windows têm comando, porque só eles têm arquivo. As outras
 * plataformas nem chegam aqui: quem monta o componente já não tem `arquivo`.
 */

/** Por quanto tempo o ícone confirma a cópia. */
const CONFIRMACAO_MS = 2000;

type Receita = { rotulo: string; comando: string };

function receitaPara(id: PlataformaId, url: string): Receita | null {
  if (id === "linux") {
    // `-f` para o curl falhar no erro de HTTP em vez de gravar a página de
    // erro dentro do arquivo, e `-L` porque o GitHub redireciona o download
    // pro CDN. O `chmod` vem junto: um AppImage sem permissão de execução é o
    // primeiro tropeço de quem baixa pela linha.
    return {
      rotulo: "bash",
      comando: `curl -fL -o ato20.AppImage "${url}" && chmod +x ato20.AppImage`,
    };
  }

  if (id === "windows") {
    // `wget` aqui é o apelido do `Invoke-WebRequest` do Windows PowerShell
    // 5.1, que é o que vem na máquina -- daí o `-OutFile`, e não o `-O` do
    // wget do GNU. No PowerShell 7 o apelido não existe mais; o rótulo diz a
    // versão pra pessoa saber em qual janela isso roda.
    return {
      rotulo: "powershell 5.1",
      comando: `wget "${url}" -OutFile ato20-setup.exe`,
    };
  }

  return null;
}

export function ComandoDeDownload({
  plataforma,
  url,
}: {
  plataforma: PlataformaId;
  url: string;
}) {
  const receita = receitaPara(plataforma, url);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    if (!copiado) return;

    const volta = setTimeout(() => setCopiado(false), CONFIRMACAO_MS);
    return () => clearTimeout(volta);
  }, [copiado]);

  if (!receita) return null;

  async function copiar() {
    if (!receita) return;

    try {
      await navigator.clipboard.writeText(receita.comando);
      setCopiado(true);
    } catch {
      // Sem permissão, ou fora de HTTPS. O comando continua à vista e
      // selecionável na mão, que é o que ele precisa ser.
    }
  }

  return (
    <div className="mt-4 flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-3 py-2">
      <span className="shrink-0 font-mono text-[0.65rem] tracking-wide text-muted-foreground uppercase">
        {receita.rotulo}
      </span>
      {/* A rolagem é do bloco: quebrar um comando em duas linhas convida a
          copiar só metade dele. */}
      <code className="flex-1 overflow-x-auto font-mono text-xs whitespace-nowrap">
        {receita.comando}
      </code>
      <button
        type="button"
        onClick={copiar}
        aria-label={copiado ? "Comando copiado" : "Copiar o comando"}
        className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        {copiado ? (
          <Check className="size-3.5 text-accent" strokeWidth={1.75} />
        ) : (
          <Copy className="size-3.5" strokeWidth={1.75} />
        )}
      </button>
    </div>
  );
}
