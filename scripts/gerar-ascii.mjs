/**
 * Gera, a partir dos .txt de `src/assets/`:
 *
 * - `src/lib/ascii-logo.ts` — a marca, que vira máscara: o desenho é só `@`, e
 *   quem escolhe o caractere de cada célula é o componente, conforme o mouse.
 * - `src/lib/ascii-itens.ts` — a poção, a espada e o machado, que ficam como
 *   vieram: eles entram de marca-d'água, e a variação de caractere do próprio
 *   desenho é o que dá o sombreado.
 *
 * Os .txt ficam versionados no repo pra a geração não depender da pasta de
 * downloads de ninguém. O Next não importa .txt direto, daí o passo de virar
 * módulo.
 *
 * Uso: pnpm gerar:ascii
 */
import { readFileSync, writeFileSync } from "node:fs";

const origem = new URL("../src/assets/ascii-logo.txt", import.meta.url);
const bruto = readFileSync(origem, "utf8").replace(/\r/g, "");

const linhas = bruto.split("\n");
// Descarta as linhas vazias das pontas, mas nunca as do meio: elas fazem parte
// do desenho.
while (linhas.length && linhas[0].trim() === "") linhas.shift();
while (linhas.length && linhas[linhas.length - 1].trim() === "") linhas.pop();

const colunas = Math.max(...linhas.map((linha) => linha.length));
// O espaço da direita é reconstruído no cliente pelo número de colunas.
const enxutas = linhas.map((linha) => linha.replace(/\s+$/, ""));

const conteudo = `// GERADO por scripts/gerar-ascii.mjs. Não edite na mão: rode \`pnpm gerar:ascii\`.
// A fonte é src/assets/ascii-logo.txt.

export const COLUNAS = ${colunas};
export const LINHAS = ${linhas.length};

/** Sem o espaço à direita; quem desenha completa até COLUNAS. */
export const MASCARA: string[] = ${JSON.stringify(enxutas, null, 2)};
`;

writeFileSync(new URL("../src/lib/ascii-logo.ts", import.meta.url), conteudo);
console.log(`ascii-logo.ts gerado: ${linhas.length} linhas x ${colunas} colunas`);

/* --- Itens ---------------------------------------------------------------- */

const ITENS = ["potion", "sword", "axe"];

/**
 * O conversor de imagem pinta o fundo com um caractere quando a origem não tem
 * transparência — a espada veio de um .jpg e chegou com o fundo todo em `:`.
 * O caractere mais frequente do desenho é esse fundo; se não for espaço, vira
 * espaço, senão a marca-d'água seria um retângulo sólido.
 */
function limparFundo(linhas) {
  const contagem = new Map();
  for (const linha of linhas) {
    for (const caractere of linha) {
      contagem.set(caractere, (contagem.get(caractere) ?? 0) + 1);
    }
  }

  const [fundo] = [...contagem].sort((a, b) => b[1] - a[1])[0] ?? [" "];
  if (fundo === " ") return linhas;

  return linhas.map((linha) => linha.split(fundo).join(" "));
}

const desenhos = ITENS.map((nome) => {
  const texto = readFileSync(
    new URL(`../src/assets/ascii-${nome}.txt`, import.meta.url),
    "utf8",
  ).replace(/\r/g, "");

  let linhas = limparFundo(texto.split("\n"));

  while (linhas.length && linhas[0].trim() === "") linhas.shift();
  while (linhas.length && linhas[linhas.length - 1].trim() === "") linhas.pop();

  const colunas = Math.max(...linhas.map((linha) => linha.length));
  // O espaço da direita não desenha nada e só engorda o HTML.
  const arte = linhas.map((linha) => linha.replace(/\s+$/, "")).join("\n");

  return { nome, colunas, linhas: linhas.length, arte };
});

const moduloDeItens = `// GERADO por scripts/gerar-ascii.mjs. Não edite na mão: rode \`pnpm gerar:ascii\`.
// As fontes são os src/assets/ascii-*.txt.

export type ItemAscii = ${ITENS.map((nome) => `"${nome}"`).join(" | ")};

export type Desenho = {
  colunas: number;
  linhas: number;
  arte: string;
};

export const ITENS_ASCII: Record<ItemAscii, Desenho> = {
${desenhos
  .map(
    ({ nome, colunas, linhas, arte }) =>
      `  ${nome}: {\n    colunas: ${colunas},\n    linhas: ${linhas},\n    arte: ${JSON.stringify(arte)},\n  },`,
  )
  .join("\n")}
};
`;

writeFileSync(new URL("../src/lib/ascii-itens.ts", import.meta.url), moduloDeItens);

for (const { nome, colunas, linhas } of desenhos) {
  console.log(`ascii-itens.ts: ${nome} com ${linhas} linhas x ${colunas} colunas`);
}
