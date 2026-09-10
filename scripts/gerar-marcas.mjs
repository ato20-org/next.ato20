/**
 * Gera `src/components/marcas.tsx` a partir do simple-icons e do @tabler/icons.
 *
 * Marca é logo de terceiro: o traçado tem que vir da fonte, não ser digitado na
 * mão. Os dois pacotes ficam em devDependency porque só rodam aqui — o site
 * leva o arquivo gerado, não os pacotes.
 *
 * Uso: pnpm gerar:marcas
 */
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";

const exigir = createRequire(import.meta.url);
const simpleIcons = exigir("simple-icons");

/** Marcas preenchidas (simple-icons). */
const PREENCHIDAS = [{ chave: "siGithub", componente: "MarcaGithub" }];

/** Marcas de traço (@tabler/icons), no mesmo peso dos ícones do lucide. */
const TRACADAS = [
  { arquivo: "brand-windows", componente: "MarcaWindows", titulo: "Windows" },
  { arquivo: "brand-apple", componente: "MarcaApple", titulo: "Apple" },
  { arquivo: "brand-android", componente: "MarcaAndroid", titulo: "Android" },
];

function gerarPreenchida({ chave, componente }) {
  const icone = simpleIcons[chave];
  if (!icone) throw new Error(`simple-icons não tem ${chave}`);

  return `export function ${componente}(props: PropsDeMarca) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" role="img" aria-hidden {...props}>
      <title>${icone.title}</title>
      <path d="${icone.path}" />
    </svg>
  );
}`;
}

function gerarTracada({ arquivo, componente, titulo }) {
  // O `exports` do @tabler/icons já mapeia "./*" pra "./icons/*", então o
  // caminho pedido é sem o "icons/" da frente.
  const caminho = exigir.resolve(`@tabler/icons/outline/${arquivo}.svg`);
  const svg = readFileSync(caminho, "utf8");

  const traçados = [...svg.matchAll(/<path\s+([^>]*?)\/>/g)]
    // O primeiro path do tabler é só a moldura invisível de 24x24.
    .filter(([, atributos]) => !atributos.includes('fill="none"') || !atributos.includes('stroke="none"'))
    .map(([, atributos]) => atributos.match(/(?:^|\s)d="([^"]+)"/)?.[1])
    .filter(Boolean);

  if (traçados.length === 0) throw new Error(`nenhum traçado em ${arquivo}.svg`);

  const paths = traçados.map((d) => `      <path d="${d}" />`).join("\n");

  return `export function ${componente}(props: PropsDeMarca) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-hidden
      {...props}
    >
      <title>${titulo}</title>
${paths}
    </svg>
  );
}`;
}

const partes = [
  ...PREENCHIDAS.map(gerarPreenchida),
  ...TRACADAS.map(gerarTracada),
];

const conteudo = `// GERADO por scripts/gerar-marcas.mjs a partir do simple-icons e do @tabler/icons.
// Não edite na mão: rode \`pnpm gerar:marcas\`.

type PropsDeMarca = React.SVGProps<SVGSVGElement>;

${partes.join("\n\n")}
`;

writeFileSync(new URL("../src/components/marcas.tsx", import.meta.url), conteudo);
console.log(`marcas.tsx gerado com ${partes.length} marca(s)`);
