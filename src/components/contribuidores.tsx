import type { Idioma } from "@/lib/idioma";
import { CONTRIBUIDORES, type Contribuidor } from "@/lib/contribuidores";
import { REPO_URL } from "@/lib/projeto";

const pt = {
  rotulo: "quem faz",
  titulo: "Feito por quem joga.",
  lead: "Código, defeito achado, ideia que virou recurso: quem já mandou alguma coisa para o ATO20 aparece aqui.",
  convite: "Quer aparecer também?",
  comoContribuir: "Veja como contribuir",
  guia: `${REPO_URL}/blob/main/CONTRIBUTING.md`,
  commits: (n: number) => (n === 1 ? "1 commit" : `${n} commits`),
};

const en: typeof pt = {
  rotulo: "who makes it",
  titulo: "Made by people who play.",
  lead: "Code, a bug found, an idea that became a feature: everyone who has sent something to ATO20 shows up here.",
  convite: "Want to show up too?",
  comoContribuir: "See how to contribute",
  guia: `${REPO_URL}/blob/main/CONTRIBUTING.en.md`,
  commits: (n) => (n === 1 ? "1 commit" : `${n} commits`),
};

const TEXTO = { pt, en };

/**
 * Quem já contribuiu com o aplicativo, com avatar e o perfil no GitHub.
 *
 * A lista vem de `src/lib/contribuidores.ts`, congelada no commit -- ver
 * `scripts/gerar-contribuidores.mjs`. O número de commits fica no `title`, e não
 * escrito embaixo de cada nome: a lista agradece, não classifica, e "1039" ao
 * lado de "2" diria o contrário do que ela quer dizer.
 *
 * O convite vem junto, porque é quem lê esta seção que está a um passo de
 * entrar nela.
 */
export function Contribuidores({ idioma }: { idioma: Idioma }) {
  const t = TEXTO[idioma];

  return (
    <section
      id="contribuidores"
      className="relative isolate mx-auto w-full max-w-3xl scroll-mt-20 overflow-hidden px-6 py-16 sm:py-20 xl:max-w-7xl xl:px-12"
    >
      <div className="surgir">
        <p className="font-mono text-sm text-muted-foreground">
          <span className="text-accent">{"//"}</span> {t.rotulo}
        </p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {t.titulo}
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
          {t.lead} {t.convite}{" "}
          <a
            href={t.guia}
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
          >
            {t.comoContribuir}
          </a>
          .
        </p>
      </div>

      <ul className="surgir mt-10 flex flex-wrap gap-4">
        {CONTRIBUIDORES.map((contribuidor) => (
          <li key={contribuidor.nome}>
            <Cartao contribuidor={contribuidor} commits={t.commits(contribuidor.commits)} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function Cartao({
  contribuidor,
  commits,
}: {
  contribuidor: Contribuidor;
  commits: string;
}) {
  const conteudo = (
    <>
      {contribuidor.avatar ? (
        // `<img>` e não `next/image`: o avatar mora no GitHub, e o tamanho
        // fixo da caixa é o que importa aqui.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={contribuidor.avatar}
          alt=""
          loading="lazy"
          decoding="async"
          className="size-14 rounded-full border border-border bg-muted object-cover"
        />
      ) : (
        <span className="grid size-14 place-items-center rounded-full border border-border bg-muted font-mono text-lg text-muted-foreground uppercase">
          {contribuidor.nome.slice(0, 1)}
        </span>
      )}
      <span className="max-w-24 truncate font-mono text-xs text-muted-foreground transition-colors group-hover:text-foreground">
        {contribuidor.nome}
      </span>
    </>
  );

  const classes = "group flex flex-col items-center gap-2";

  return contribuidor.perfil ? (
    <a
      href={contribuidor.perfil}
      target="_blank"
      rel="noreferrer"
      title={commits}
      className={classes}
    >
      {conteudo}
    </a>
  ) : (
    <div title={commits} className={classes}>
      {conteudo}
    </div>
  );
}
