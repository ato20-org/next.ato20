/**
 * Gera `src/lib/contribuidores.ts`: quem já contribuiu com o aplicativo, pelos
 * commits do repositório.
 *
 * Congelado no commit pela razão das releases (ver `gerar-releases.mjs`): o
 * visitante não gasta o rate limit do GitHub, e não existe estado de
 * carregando. Roda junto do `gerar:releases`, que já roda a cada versão, para
 * a lista não envelhecer esquecida.
 *
 * Bot fica de fora: o dependabot não contribuiu, abriu PR de versão.
 *
 * Commit cujo e-mail não está ligado a conta nenhuma o GitHub devolve como
 * anônimo, com nome e e-mail. Os que se sabe de quem são entram em `CONTAS` e
 * viram a conta de verdade, com avatar e perfil; o resto entra só com o nome.
 * O e-mail NUNCA sai daqui: ele está no histórico do git, mas pôr na página é
 * outra coisa.
 *
 * Uso: pnpm gerar:contribuidores
 *      GITHUB_TOKEN=... pnpm gerar:contribuidores   (sem o gh instalado)
 */

import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const REPOSITORIO = "ato20-org/ato20";
const API = "https://api.github.com";
const DESTINO = "src/lib/contribuidores.ts";

/** E-mail de commit -> conta no GitHub, para quem o GitHub não liga sozinho. */
const CONTAS = {
  "bot@xoykor.dev": "xoykor",
};

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

async function pedir(caminho) {
  const resposta = await fetch(`${API}${caminho}`, { headers: cabecalhos });
  if (!resposta.ok) {
    throw new Error(`GitHub respondeu ${resposta.status} ${resposta.statusText} pra ${caminho}.`);
  }
  return resposta.json();
}

// 100 é o teto da API por página. Passando disso, é hora de paginar.
const lista = await pedir(`/repos/${REPOSITORIO}/contributors?anon=1&per_page=100`);

const porConta = new Map();
const semConta = [];

for (const cada of lista) {
  if (cada.type === "Bot" || cada.login?.endsWith("[bot]")) continue;

  const login = cada.login ?? CONTAS[cada.email];
  if (!login) {
    if (cada.name) semConta.push({ nome: cada.name, perfil: null, avatar: null, commits: cada.contributions });
    continue;
  }

  // A mesma pessoa pode vir duas vezes: pela conta e por um e-mail solto.
  const antes = porConta.get(login);
  porConta.set(login, {
    nome: login,
    perfil: cada.html_url ?? antes?.perfil ?? null,
    avatar: cada.avatar_url ?? antes?.avatar ?? null,
    commits: (antes?.commits ?? 0) + cada.contributions,
  });
}

// Quem chegou só pelo e-mail ainda não tem avatar nem perfil.
for (const contribuidor of porConta.values()) {
  if (contribuidor.avatar && contribuidor.perfil) continue;

  const conta = await pedir(`/users/${contribuidor.nome}`);
  contribuidor.avatar = conta.avatar_url;
  contribuidor.perfil = conta.html_url;
}

const contribuidores = [...porConta.values(), ...semConta].sort(
  (a, b) => b.commits - a.commits || a.nome.localeCompare(b.nome),
);

const conteudo = `// GERADO por scripts/gerar-contribuidores.mjs a partir da API do GitHub.
// Não edite na mão: rode \`pnpm gerar:contribuidores\`.

export type Contribuidor = {
  /** O login no GitHub, ou o nome do commit quando não há conta ligada. */
  nome: string;
  /** \`null\` para quem não tem conta ligada aos commits. */
  perfil: string | null;
  avatar: string | null;
  commits: number;
};

/** De quem mais contribuiu para quem menos, até o momento da geração. */
export const CONTRIBUIDORES: Contribuidor[] = ${JSON.stringify(contribuidores, null, 2)};
`;

writeFileSync(DESTINO, conteudo);
console.log(`${DESTINO}: ${contribuidores.length} contribuidor(es).`);
