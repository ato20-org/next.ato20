import { LANG, type Idioma } from "@/lib/idioma";

/**
 * O README do repositório de um plugin, que a página `/plugins/{id}` desenha:
 * é ali que o autor mostra o plugin funcionando, com imagem e passo a passo, e
 * é o mesmo texto que o aplicativo mostra na janela de detalhes do catálogo.
 *
 * Lido no build, e de novo a cada hora (o `revalidate` da página): o autor
 * sobe imagem nova no README e a página acompanha sem deploy do site.
 */

/** `dono` e `repo` de `https://github.com/{dono}/{repo}`, com `/` ou `.git` no fim tolerados. */
function repositorioDoGithub(url: string): { dono: string; repo: string } | null {
  const casou = /^https:\/\/github\.com\/([A-Za-z0-9][A-Za-z0-9-]{0,38})\/([A-Za-z0-9._-]{1,100}?)(?:\.git)?\/?$/.exec(url);
  if (!casou || casou[2] === "." || casou[2] === "..") return null;

  return { dono: casou[1], repo: casou[2] };
}

/**
 * `README.{idioma}.md` primeiro (`README.en.md` na página em inglês), e o
 * `README.md` depois, da branch principal.
 *
 * `null` quando o repositório não tem README: a página fica com o cabeçalho e
 * o link do GitHub. Qualquer outra falha lança: no build, derruba o deploy em
 * vez de publicar a página sem o README; na revalidação, a página de antes
 * continua no ar.
 */
export async function lerReadme(repositorio: string, idioma: Idioma): Promise<string | null> {
  const partes = repositorioDoGithub(repositorio);
  if (!partes) throw new Error(`${repositorio}: não é um repositório do GitHub`);

  const raiz = `https://raw.githubusercontent.com/${partes.dono}/${partes.repo}/HEAD`;

  for (const arquivo of [`README.${LANG[idioma]}.md`, "README.md"]) {
    const resposta = await fetch(`${raiz}/${arquivo}`, { next: { revalidate: 3600 } });

    if (resposta.ok) return resposta.text();
    if (resposta.status !== 404) {
      throw new Error(`${raiz}/${arquivo}: HTTP ${resposta.status}`);
    }
  }

  return null;
}

/**
 * Para onde um endereço do README aponta de verdade, ou `null` quando ele não
 * deve sair daqui.
 *
 * O README é escrito para o GitHub, onde `docs/tela.png` (e `/docs/tela.png`)
 * é relativo à raiz do repositório; aqui ele resolveria contra o site. Imagem
 * vai para o `raw.githubusercontent.com`, que serve o arquivo; link vai para a
 * página do arquivo no GitHub. Imagem apontada pela página (`/blob/`) vira o
 * arquivo (`/raw/`), como o GitHub faz ao desenhar. A mesma regra do
 * aplicativo (`enderecoDoReadme`, em `src/lib/extensoes/catalogo.ts`).
 */
export function enderecoDoReadme(
  endereco: string,
  repositorio: string,
  tipo: "imagem" | "link",
): string | null {
  const partes = repositorioDoGithub(repositorio);
  if (!partes) return null;

  if (endereco.startsWith("#")) return tipo === "link" ? endereco : null;

  const base =
    tipo === "imagem"
      ? `https://raw.githubusercontent.com/${partes.dono}/${partes.repo}/HEAD/`
      : `https://github.com/${partes.dono}/${partes.repo}/blob/HEAD/`;
  const relativoARaiz = endereco.startsWith("/") && !endereco.startsWith("//");

  let url: URL;
  try {
    url = new URL(relativoARaiz ? endereco.slice(1) : endereco, base);
  } catch {
    return null;
  }

  if (url.protocol === "mailto:") return tipo === "link" ? url.href : null;
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;

  if (tipo === "imagem" && url.hostname === "github.com") {
    url.pathname = url.pathname.replace(/^(\/[^/]+\/[^/]+)\/blob\//, "$1/raw/");
  }

  return url.href;
}

/**
 * A âncora que o GitHub dá a um título: `## O que vira o quê` é
 * `#o-que-vira-o-quê`. É o que faz o sumário de um README funcionar aqui.
 */
export function ancoraDoTitulo(titulo: string): string {
  return titulo
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}\p{Pc} -]/gu, "")
    .replace(/ /g, "-");
}
