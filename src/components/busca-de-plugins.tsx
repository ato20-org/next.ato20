"use client";

import { Search } from "lucide-react";
import { useDeferredValue, useState, type ReactNode } from "react";

import { normalizar } from "@/lib/busca";
import type { Idioma } from "@/lib/idioma";

const pt = {
  rotulo: "Buscar plugins",
  placeholder: "buscar por nome, autor ou tag",
  todos: (total: number) => (total === 1 ? "1 plugin" : `${total} plugins`),
  achados: (achados: number, total: number) => `${achados} de ${total}`,
  nada: (busca: string) => `nenhum plugin com “${busca}”.`,
  limpar: "limpar a busca",
};

const en: typeof pt = {
  rotulo: "Search plugins",
  placeholder: "search by name, author or tag",
  todos: (total) => (total === 1 ? "1 plugin" : `${total} plugins`),
  achados: (achados, total) => `${achados} of ${total}`,
  nada: (busca) => `no plugin matches “${busca}”.`,
  limpar: "clear the search",
};

const TEXTO = { pt, en };

export type ItemDaBusca = {
  id: string;
  /** Nome, descrição, autor, tags e id, no idioma da página e já normalizados. */
  busca: string;
  card: ReactNode;
};

/**
 * O campo de busca e a grade que ele filtra.
 *
 * Os cards chegam prontos do servidor: aqui só se decide quais aparecem. Cada
 * palavra digitada tem de estar no plugin, em qualquer ordem, então "ordem
 * tema" acha o plugin de Ordem pelo nome e pela tag.
 */
export function BuscaDePlugins({ idioma, itens }: { idioma: Idioma; itens: ItemDaBusca[] }) {
  const t = TEXTO[idioma];
  const [busca, setBusca] = useState("");
  const adiada = useDeferredValue(busca);

  const termos = normalizar(adiada).split(/\s+/).filter(Boolean);
  const visiveis =
    termos.length === 0
      ? itens
      : itens.filter((item) => termos.every((termo) => item.busca.includes(termo)));

  return (
    <>
      <div className="mt-16 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex w-full items-center gap-2.5 rounded-lg border border-border bg-muted/20 px-3 transition-colors focus-within:border-muted-foreground sm:max-w-sm">
          <Search className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.75} aria-hidden />
          <input
            type="search"
            value={busca}
            onChange={(evento) => setBusca(evento.target.value)}
            placeholder={t.placeholder}
            aria-label={t.rotulo}
            className="w-full bg-transparent py-2.5 font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground/70"
          />
        </label>
        <p className="font-mono text-xs text-muted-foreground" aria-live="polite">
          {termos.length === 0 ? t.todos(itens.length) : t.achados(visiveis.length, itens.length)}
        </p>
      </div>

      {visiveis.length === 0 ? (
        <p className="mt-10 font-mono text-sm text-muted-foreground">
          {t.nada(adiada.trim())}{" "}
          <button
            type="button"
            onClick={() => setBusca("")}
            className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
          >
            {t.limpar}
          </button>
        </p>
      ) : (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {visiveis.map((item) => (
            <li
              key={item.id}
              className="flex flex-col overflow-hidden rounded-xl border border-border bg-muted/20"
            >
              {item.card}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
