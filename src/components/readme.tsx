import type { ReactNode } from "react";
import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

import { ancoraDoTitulo, enderecoDoReadme } from "@/lib/readme";

/** Um nó do HTML que o Markdown virou: só o que `textoDoNo` lê dele. */
type No = { type: string; value?: string; children?: No[] };

/** O texto de um título, com o que houver de negrito ou código dentro. */
function textoDoNo(no: No | undefined): string {
  if (!no) return "";
  if (no.type === "text") return no.value ?? "";

  return (no.children ?? []).map(textoDoNo).join("");
}

const TITULO = {
  h1: "mt-12 mb-4 border-b border-border pb-2 text-2xl font-semibold tracking-tight first:mt-0",
  h2: "mt-12 mb-4 border-b border-border pb-2 text-xl font-semibold tracking-tight first:mt-0",
  h3: "mt-8 mb-3 text-lg font-semibold tracking-tight first:mt-0",
  h4: "mt-6 mb-2 font-semibold first:mt-0",
};

/** O id é a âncora do GitHub, sem prefixo: o `#instalar` do sumário funciona sem JavaScript. */
function Titulo({
  nivel: Nivel,
  no,
  children,
}: {
  nivel: keyof typeof TITULO;
  no: unknown;
  children?: ReactNode;
}) {
  return (
    <Nivel
      id={ancoraDoTitulo(textoDoNo(no as No | undefined))}
      className={`scroll-mt-8 text-balance text-foreground ${TITULO[Nivel]}`}
    >
      {children}
    </Nivel>
  );
}

const COMPONENTES: Components = {
  h1: ({ node, children }) => <Titulo nivel="h1" no={node}>{children}</Titulo>,
  h2: ({ node, children }) => <Titulo nivel="h2" no={node}>{children}</Titulo>,
  h3: ({ node, children }) => <Titulo nivel="h3" no={node}>{children}</Titulo>,
  h4: ({ node, children }) => <Titulo nivel="h4" no={node}>{children}</Titulo>,
  h5: ({ node, children }) => <Titulo nivel="h4" no={node}>{children}</Titulo>,
  h6: ({ node, children }) => <Titulo nivel="h4" no={node}>{children}</Titulo>,
  p: ({ children }) => <p className="my-4 leading-relaxed text-pretty">{children}</p>,
  a: ({ href, children }) =>
    href?.startsWith("#") ? (
      <a href={href} className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground">
        {children}
      </a>
    ) : (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
      >
        {children}
      </a>
    ),
  ul: ({ children, className }) => (
    <ul
      className={
        className?.includes("contains-task-list")
          ? "my-4 flex flex-col gap-1.5"
          : "my-4 flex list-disc flex-col gap-1.5 pl-6 marker:text-muted-foreground"
      }
    >
      {children}
    </ul>
  ),
  ol: ({ children, start }) => (
    <ol start={start} className="my-4 flex list-decimal flex-col gap-1.5 pl-6 marker:font-mono marker:text-sm marker:text-accent">
      {children}
    </ol>
  ),
  // O parágrafo dentro do item é o da lista "frouxa" (itens separados por
  // linha em branco): sem a margem dele, ela vira uma escada.
  li: ({ children }) => (
    <li className="pl-1 leading-relaxed [&>ol]:my-2 [&>p]:my-1.5 [&>ul]:my-2">{children}</li>
  ),
  input: ({ checked }) => (
    <input type="checkbox" checked={checked ?? false} disabled className="mr-2 align-middle" />
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-2 border-accent/60 pl-4 text-muted-foreground">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-border" />,
  pre: ({ children }) => (
    <pre className="my-4 overflow-x-auto rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-[1em]">
      {children}
    </pre>
  ),
  code: ({ children }) => (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
      {children}
    </code>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  th: ({ children, style }) => (
    <th
      style={style}
      className="border-b border-border bg-muted/40 px-3 py-2 text-left align-top font-medium text-foreground"
    >
      {children}
    </th>
  ),
  td: ({ children, style }) => (
    <td style={style} className="border-t border-border px-3 py-2 align-top">
      {children}
    </td>
  ),
  img: ({ src, alt, title }) =>
    typeof src === "string" && src !== "" ? (
      // `<img>` e não `next/image`: o endereço é de qualquer repositório, e
      // o tamanho não se sabe antes de baixar.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt ?? ""}
        title={title}
        loading="lazy"
        decoding="async"
        className="inline-block h-auto max-w-full rounded-lg align-middle"
      />
    ) : null,
};

/**
 * O README de um plugin, como o GitHub o mostra: tabela, código, lista de
 * tarefas e imagem. Desenhado no servidor, sem JavaScript na página.
 *
 * Sem HTML cru (`skipHtml`): o texto vem do repositório de quem fez o plugin,
 * e entra na página do site do ATO20. Os endereços passam por
 * `enderecoDoReadme`, que resolve o relativo contra o repositório e recusa o
 * que não é `http(s)`.
 */
export function Readme({ texto, repositorio }: { texto: string; repositorio: string }) {
  return (
    <div className="text-muted-foreground [&_strong]:font-medium [&_strong]:text-foreground">
      <Markdown
        remarkPlugins={[remarkGfm]}
        skipHtml
        urlTransform={(url, _chave, no) =>
          enderecoDoReadme(url, repositorio, no.tagName === "img" ? "imagem" : "link")
        }
        components={COMPONENTES}
      >
        {texto}
      </Markdown>
    </div>
  );
}
