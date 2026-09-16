import { Fragment, type ReactNode } from "react";

/**
 * Desenha as notas de uma release.
 *
 * O GitHub guarda o corpo da release em markdown, e aqui só existe o pedaço
 * dele que as notas do ATO20 usam de verdade: título, parágrafo, quebra de
 * linha, lista, negrito, código e link. Um parser completo entraria como
 * dependência nova pra resolver um problema que ainda não existe; quando a nota
 * usar algo além disso, ou este arquivo cresce ou a dependência entra — foi o
 * que aconteceu na v0.0.4, que chegou com `##` e com o padrão de uma linha em
 * negrito servindo de subtítulo pro parágrafo de baixo.
 */

const TITULO = /^(#{1,6})\s+(.+)$/;

/** Uma linha que é só negrito: o changelog usa isso como subtítulo. */
const SUBTITULO = /^\*\*([^*]+)\*\*$/;

const INLINE = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;

function formatar(texto: string, chave: string): ReactNode[] {
  return texto.split(INLINE).map((pedaco, indice) => {
    const id = `${chave}-${indice}`;

    if (pedaco.startsWith("**") && pedaco.endsWith("**")) {
      return (
        <strong key={id} className="font-medium text-foreground">
          {pedaco.slice(2, -2)}
        </strong>
      );
    }

    if (pedaco.startsWith("`") && pedaco.endsWith("`")) {
      return (
        <code
          key={id}
          className="rounded border border-border bg-muted/50 px-1 py-0.5 font-mono text-[0.9em] text-foreground"
        >
          {pedaco.slice(1, -1)}
        </code>
      );
    }

    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(pedaco);

    // Só http(s): o corpo da release é texto de fora do código, e um `href`
    // com esquema arbitrário é a porta pra `javascript:`.
    if (link && /^https?:\/\//.test(link[2])) {
      return (
        <a
          key={id}
          href={link[2]}
          target="_blank"
          rel="noreferrer"
          className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
        >
          {link[1]}
        </a>
      );
    }

    return <Fragment key={id}>{pedaco}</Fragment>;
  });
}

function ehItem(linha: string) {
  return linha.startsWith("- ") || linha.startsWith("* ");
}

export function NotasDeRelease({ notas }: { notas: string }) {
  if (!notas) {
    return (
      <p className="text-muted-foreground italic">Esta release saiu sem notas.</p>
    );
  }

  // Linha em branco separa bloco; dentro do bloco, a quebra é quebra mesmo —
  // as notas do ATO20 são escritas com as linhas já cortadas na mão.
  const blocos = notas.split(/\n{2,}/);

  return (
    <div className="space-y-4 leading-relaxed text-muted-foreground">
      {blocos.map((bloco, indice) => {
        const linhas = bloco.split("\n");

        const titulo = TITULO.exec(bloco.trim());
        if (titulo) {
          // `##` é a divisão da release (Novidades, Correções), e sai na mesma
          // voz dos rótulos do site. Mais fundo que isso vira só um parágrafo
          // em destaque: hierarquia de quarto nível numa nota de versão não
          // tem o que significar.
          return titulo[1].length <= 2 ? (
            <h3
              key={indice}
              className="pt-6 font-mono text-xs tracking-widest text-accent uppercase first:pt-0"
            >
              {titulo[2]}
            </h3>
          ) : (
            <p key={indice} className="pt-2 font-medium text-foreground">
              {formatar(titulo[2], `${indice}`)}
            </p>
          );
        }

        const subtitulo = SUBTITULO.exec(linhas[0]);
        if (subtitulo) {
          const resto = linhas.slice(1);

          return (
            <div key={indice}>
              <p className="font-medium text-foreground">{subtitulo[1]}</p>
              {resto.length > 0 ? (
                <p className="mt-1 text-pretty">
                  {resto.map((linha, item) => (
                    <Fragment key={item}>
                      {item > 0 ? <br /> : null}
                      {formatar(linha, `${indice}-${item}`)}
                    </Fragment>
                  ))}
                </p>
              ) : null}
            </div>
          );
        }

        if (linhas.every(ehItem)) {
          return (
            <ul key={indice} className="list-disc space-y-1.5 pl-5">
              {linhas.map((linha, item) => (
                <li key={item}>{formatar(linha.slice(2), `${indice}-${item}`)}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={indice} className="text-pretty">
            {linhas.map((linha, item) => (
              <Fragment key={item}>
                {item > 0 ? <br /> : null}
                {formatar(linha, `${indice}-${item}`)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
