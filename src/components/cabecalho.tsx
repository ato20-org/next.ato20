import Image from "next/image";
import Link from "next/link";

import marca from "@/assets/marca-ato20.png";
import { MarcaGithub } from "@/components/marcas";
import { REPO_URL } from "@/lib/projeto";

/**
 * A barra do topo, igual na home e na página de releases.
 *
 * A marca é link pra home em todas as páginas, inclusive na própria home: uma
 * marca que às vezes leva pra algum lugar e às vezes não é pior do que uma que
 * sempre leva.
 */
export function Cabecalho() {
  return (
    <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-6 xl:max-w-7xl xl:px-12">
      <Link href="/" className="flex items-center gap-2.5">
        {/* A marca já vem branca com alpha: o `alt` fica vazio porque o nome do
            projeto está escrito do lado. */}
        <Image src={marca} alt="" className="h-5 w-auto" preload />
        <span className="font-mono text-sm font-medium tracking-tight">
          ATO20
        </span>
      </Link>

      <nav className="flex items-center gap-5 font-mono text-xs text-muted-foreground">
        <Link href="/releases" className="transition-colors hover:text-foreground">
          releases
        </Link>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
        >
          <MarcaGithub className="size-4" />
          github
        </a>
      </nav>
    </header>
  );
}
