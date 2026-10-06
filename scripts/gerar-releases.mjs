/**
 * Gera `src/lib/releases.ts`: as releases publicadas do aplicativo, com as
 * notas e os arquivos de cada uma.
 *
 * A landing é estática, então os dados são congelados no commit em vez de
 * buscados na API a cada visita: o visitante não gasta o rate limit do GitHub,
 * a página indexa, e não existe estado de carregando. O preço é rodar este
 * script quando sair release nova.
 *
 * Os `.sig` e o `latest.json` ficam de fora: o primeiro é a assinatura que o
 * atualizador do Tauri confere, o segundo é o manifesto que ele lê. Nenhum dos
 * dois é arquivo que alguém baixa na mão.
 *
 * Enquanto o repositório do aplicativo for privado, a API anônima devolve 404,
 * então o script pega o token do `gh` que já está logado na máquina. Quando o
 * repositório abrir, nada disso é necessário.
 *
 * Uso: pnpm gerar:releases
 *      GITHUB_TOKEN=... pnpm gerar:releases   (sem o gh instalado)
 */
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const REPOSITORIO = "ato20-org/ato20";
const API = `https://api.github.com/repos/${REPOSITORIO}/releases?per_page=30`;
const DESTINO = "src/lib/releases.ts";

/** Arquivos que existem pro atualizador, e não pra quem baixa. */
const INTERNOS = /(\.sig|latest\.json)$/;

function tokenDoGh() {
  try {
    return execFileSync("gh", ["auth", "token"], { encoding: "utf8" }).trim();
  } catch {
    return "";
  }
}

const token = process.env.GITHUB_TOKEN || tokenDoGh();

const cabecalhos = {
  accept: "application/vnd.github+json",
  "user-agent": "ato20-landing",
  ...(token ? { authorization: `Bearer ${token}` } : {}),
};

const resposta = await fetch(API, { headers: cabecalhos });

if (!resposta.ok) {
  throw new Error(
    `GitHub respondeu ${resposta.status} ${resposta.statusText} pra ${API}. ` +
      "Se o repositório for privado, autentique com `gh auth login` ou GITHUB_TOKEN.",
  );
}

/**
 * O corpo de uma release é português e, depois do marcador, inglês:
 *
 *     ## Novidades
 *     ...
 *     ---
 *     <!-- en -->
 *     ## What's new
 *     ...
 *
 * O marcador é comentário de HTML, invisível no GitHub; o `---` antes dele é o
 * que separa as duas línguas para quem lê lá. Release sem marcador é só
 * português, e a página em inglês a mostra assim, avisando.
 */
const MARCADOR_EN = /\n(?:---\s*\n)?\s*<!--\s*en\s*-->\s*\n/;

function separarNotas(corpo) {
  const texto = (corpo ?? "").replace(/\r\n/g, "\n").trim();
  const [pt, en] = texto.split(MARCADOR_EN);

  return { notas: pt.replace(/\n---\s*$/, "").trim(), notasEn: en?.trim() || null };
}

const releases = (await resposta.json())
  // Rascunho não é release publicada: ninguém de fora consegue baixar.
  .filter((release) => !release.draft)
  .map((release) => ({
    tag: release.tag_name,
    nome: release.name || release.tag_name,
    publicadaEm: release.published_at,
    prerelease: release.prerelease,
    pagina: release.html_url,
    ...separarNotas(release.body),
    arquivos: release.assets
      .filter((arquivo) => !INTERNOS.test(arquivo.name))
      .map((arquivo) => ({
        nome: arquivo.name,
        url: arquivo.browser_download_url,
        bytes: arquivo.size,
      })),
  }));

const conteudo = `// GERADO por scripts/gerar-releases.mjs a partir da API do GitHub.
// Não edite na mão: rode \`pnpm gerar:releases\`.

export type ArquivoDeRelease = {
  nome: string;
  url: string;
  bytes: number;
};

export type Release = {
  tag: string;
  nome: string;
  /** ISO 8601, em UTC. Quem formata é quem mostra. */
  publicadaEm: string;
  prerelease: boolean;
  pagina: string;
  /** Markdown em português, como o GitHub guardou. Ver \`notas-de-release.tsx\`. */
  notas: string;
  /** A seção em inglês do mesmo corpo, depois de \`<!-- en -->\`. \`null\` sem ela. */
  notasEn: string | null;
  arquivos: ArquivoDeRelease[];
};

/** Da mais nova pra mais velha, que é como a API devolve. */
export const RELEASES: Release[] = ${JSON.stringify(releases, null, 2)};

export const ULTIMA_RELEASE: Release | undefined = RELEASES[0];
`;

writeFileSync(DESTINO, conteudo);

console.log(
  `${DESTINO}: ${releases.length} release(s), ${releases[0]?.tag ?? "nenhuma"} é a mais nova.`,
);
