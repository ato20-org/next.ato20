import { existsSync } from "node:fs";
import { join } from "node:path";

import { LANG, type Idioma } from "@/lib/idioma";

import bruto from "../../public/plugins.json";

/**
 * O catálogo de plugins: a lista da página `/plugins`.
 *
 * Um arquivo só, `public/plugins.json`, escrito à mão. Mora em `public/` e não
 * ao lado deste módulo porque tem dois leitores: esta página, no build, e o
 * aplicativo, que vai buscar `/plugins.json` para a aba de catálogo da tela de
 * Plugins. Por isso o `Access-Control-Allow-Origin` em `next.config.ts`: a
 * webview pede a partir de `tauri://localhost`.
 *
 * Para pôr um plugin na vitrine:
 *
 * 1. Uma entrada nova em `plugins`. O `id` é o MESMO do `manifest.json` do
 *    plugin: é por ele que o aplicativo vai saber que já está instalado.
 * 2. Ícone e capa, se houver, em `public/plugins/{id}/`: o ícone quadrado
 *    (256×256), a capa em 16:9 (1280×720). Sem eles, a página desenha a
 *    inicial e o nome da pasta.
 * 3. `pnpm build`: entrada malformada ou imagem que não existe derruba o build
 *    com o caminho do erro, em vez de publicar um card quebrado.
 *
 * `formato` é a versão deste arquivo, e não do site: quando a forma mudar, o
 * aplicativo que já está na máquina das pessoas vê o número e ignora a lista,
 * em vez de quebrar a tela.
 */
export const FORMATO = 1;

/**
 * Como no manifesto da API 7: uma string, ou uma por idioma (`pt-BR`, `en`).
 * A descrição do manifesto do plugin entra aqui copiada como está.
 */
export type Texto = string | Record<string, string>;

export type PluginDoCatalogo = {
  id: string;
  nome: Texto;
  descricao: Texto;
  autor: string;
  repositorio: string;
  /** Caminho em `public/`, quadrado. */
  icone?: string;
  /** Caminho em `public/`, 16:9. */
  capa?: string;
  /** O manifesto tem `principal`. É o que decide o selo do card. */
  executaCodigo: boolean;
  apiVersao: number;
  tags: string[];
};

const ID = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function ehTexto(valor: unknown): boolean {
  if (typeof valor === "string") return valor.trim() !== "";
  if (valor === null || typeof valor !== "object") return false;

  const textos = Object.values(valor);
  return textos.length > 0 && textos.every((cada) => typeof cada === "string" && cada.trim() !== "");
}

function ehImagemOpcional(valor: unknown): boolean {
  if (valor === undefined) return true;

  return (
    typeof valor === "string" &&
    valor.startsWith("/plugins/") &&
    existsSync(join(process.cwd(), "public", valor))
  );
}

/**
 * Cada campo, o teste e o que dizer quando ele falha. Uma tabela e não um `if`
 * por campo: campo novo é uma linha, e a recusa de campo desconhecido vale
 * para ele sem ninguém lembrar.
 */
const CAMPOS: [keyof PluginDoCatalogo, (valor: unknown) => boolean, string][] = [
  ["id", (v) => typeof v === "string" && ID.test(v), "precisa ser minúsculo, com hífens, igual ao do manifest.json"],
  ["nome", ehTexto, "precisa ser um texto, ou um por idioma"],
  ["descricao", ehTexto, "precisa ser um texto, ou um por idioma"],
  ["autor", (v) => typeof v === "string" && v.trim() !== "", "precisa ser um texto"],
  ["repositorio", (v) => typeof v === "string" && v.startsWith("https://github.com/"), "precisa começar com https://github.com/"],
  ["icone", ehImagemOpcional, "precisa ser um arquivo que existe em public/plugins/"],
  ["capa", ehImagemOpcional, "precisa ser um arquivo que existe em public/plugins/"],
  ["executaCodigo", (v) => typeof v === "boolean", "precisa ser true ou false"],
  ["apiVersao", (v) => Number.isInteger(v), "precisa ser um número inteiro"],
  ["tags", (v) => Array.isArray(v) && v.every((tag) => typeof tag === "string"), "precisa ser uma lista de textos"],
];

/**
 * Lê o arquivo e recusa o que não serve, no build.
 *
 * Recusa também campo que não existe: `"icon"` no lugar de `"icone"` passaria
 * calado, e o card sairia sem ícone sem ninguém saber por quê.
 */
function validar(dados: { formato?: unknown; plugins?: unknown }): PluginDoCatalogo[] {
  const erro = (onde: string, problema: string) =>
    new Error(`public/plugins.json: ${onde} ${problema}`);

  if (dados.formato !== FORMATO) throw erro("formato", `precisa ser ${FORMATO}`);
  if (!Array.isArray(dados.plugins)) throw erro("plugins", "precisa ser uma lista");

  const vistos = new Set<string>();

  dados.plugins.forEach((plugin: Record<string, unknown>, indice) => {
    const onde = `plugins[${indice}]`;

    for (const chave of Object.keys(plugin)) {
      if (!CAMPOS.some(([campo]) => campo === chave)) {
        throw erro(`${onde}.${chave}`, "não é um campo do catálogo");
      }
    }
    for (const [campo, valido, problema] of CAMPOS) {
      if (!valido(plugin[campo])) throw erro(`${onde}.${campo}`, problema);
    }

    const id = plugin.id as string;
    if (vistos.has(id)) throw erro(`${onde}.id`, `"${id}" aparece duas vezes`);
    vistos.add(id);
  });

  return dados.plugins as PluginDoCatalogo[];
}

/** Na ordem do arquivo: quem escreve a lista escolhe quem vem primeiro. */
export const PLUGINS = validar(bruto);

/**
 * O texto no idioma da página: a chave exata (`pt-BR`), depois qualquer uma
 * da mesma língua (`pt`, `en-US`), depois a primeira que houver. Um plugin
 * descrito só em português ainda aparece na página em inglês.
 */
export function noIdioma(texto: Texto, idioma: Idioma): string {
  if (typeof texto === "string") return texto;

  const lang = LANG[idioma];
  const lingua = lang.split("-")[0];
  const pares = Object.entries(texto);

  return (
    texto[lang] ??
    pares.find(([chave]) => chave.split("-")[0] === lingua)?.[1] ??
    pares[0][1]
  );
}
