/**
 * Gera `src/lib/ascii-logo.ts` a partir de `src/assets/ascii-logo.txt`.
 *
 * O .txt fica versionado no repo pra a geração não depender da pasta de
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
