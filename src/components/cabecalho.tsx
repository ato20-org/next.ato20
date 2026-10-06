import Image from "next/image";
import Link from "next/link";

import marca from "@/assets/marca-ato20.png";
import { MarcaGithub } from "@/components/marcas";
import { caminho, IDIOMAS, NOME_CURTO, type Idioma, type Rota } from "@/lib/idioma";
import { REPO_URL } from "@/lib/projeto";

const pt = { releases: "releases", trocar: "Read in English" };

const en: typeof pt = { releases: "releases", trocar: "Ler em português" };

const TEXTO = { pt, en };

/**
 * A barra do topo, igual na home e na página de releases.
 *
 * A marca é link pra home em todas as páginas, inclusive na própria home: uma
 * marca que às vezes leva pra algum lugar e às vezes não é pior do que uma que
 * sempre leva.
 *
 * A troca de idioma leva à MESMA página no outro idioma, e não à home dele:
 * quem estava lendo as releases quer as releases. Os dois códigos à vista, o
 * atual aceso, porque um botão que só diz "EN" não conta em que idioma se está.
 */
export function Cabecalho({ idioma, rota }: { idioma: Idioma; rota: Rota }) {
  const t = TEXTO[idioma];

  return (
    <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-6 xl:max-w-7xl xl:px-12">
      <Link href={caminho(idioma, "/")} className="flex items-center gap-2.5">
        {/* A marca já vem branca com alpha: o `alt` fica vazio porque o nome do
            projeto está escrito do lado. */}
        <Image src={marca} alt="" className="h-5 w-auto" preload />
        <span className="font-mono text-sm font-medium tracking-tight">
          ATO20
        </span>
      </Link>

      <nav className="flex items-center gap-5 font-mono text-xs text-muted-foreground">
        <Link
          href={caminho(idioma, "/releases")}
          className="transition-colors hover:text-foreground"
        >
          {t.releases}
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
        {/* `<a>` e não `<Link>`: cada idioma tem o seu root layout, e a troca
            entre eles é uma carga de página inteira de qualquer jeito. */}
        <span className="flex items-center gap-1.5">
          {IDIOMAS.map((cada) =>
            cada === idioma ? (
              <span key={cada} className="text-foreground" aria-current="page">
                {NOME_CURTO[cada]}
              </span>
            ) : (
              <a
                key={cada}
                href={caminho(cada, rota)}
                hrefLang={cada === "pt" ? "pt-BR" : "en"}
                lang={cada === "pt" ? "pt-BR" : "en"}
                aria-label={t.trocar}
                className="transition-colors hover:text-foreground"
              >
                {NOME_CURTO[cada]}
              </a>
            ),
          )}
        </span>
      </nav>
    </header>
  );
}
