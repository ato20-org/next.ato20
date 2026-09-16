import { ULTIMA_RELEASE, type ArquivoDeRelease } from "@/lib/releases";

export type PlataformaId = "linux" | "windows" | "macos" | "android" | "ios";

export type PrevisaoId = "em-breve" | "mais-pra-frente";

/** O texto da tag que acompanha cada plataforma enquanto não há build. */
export const PREVISOES: Record<PrevisaoId, string> = {
  "em-breve": "em breve",
  "mais-pra-frente": "mais pra frente",
};

export type Plataforma = {
  id: PlataformaId;
  nome: string;
  /**
   * Final do nome do arquivo principal da plataforma dentro da release. É por
   * ele que a disponibilidade é descoberta: se a release trouxe o arquivo, a
   * plataforma está no ar — não existe um interruptor pra esquecer de virar.
   */
  principal: string;
  /** Outros formatos da mesma plataforma, na ordem em que devem aparecer. */
  alternativos: string[];
  /** Nome planejado, mostrado enquanto a release ainda não publica o arquivo. */
  artefato: string;
  /** Prazo relativo: separa o que vem primeiro do que ainda vai demorar. */
  previsao: PrevisaoId;
};

export const PLATAFORMAS: Record<PlataformaId, Plataforma> = {
  linux: {
    id: "linux",
    nome: "Linux",
    // O AppImage é o padrão porque roda sem instalar nada.
    principal: "amd64.AppImage",
    alternativos: [".deb", ".rpm"],
    artefato: "ato20_amd64.AppImage",
    previsao: "em-breve",
  },
  windows: {
    id: "windows",
    nome: "Windows",
    principal: "x64-setup.exe",
    alternativos: [".msi"],
    artefato: "ato20_x64-setup.exe",
    previsao: "em-breve",
  },
  macos: {
    id: "macos",
    nome: "macOS",
    principal: ".dmg",
    alternativos: [],
    artefato: "ato20_universal.dmg",
    // Assinar e empacotar .dmg pede um Mac, e ainda não há um por aqui.
    previsao: "mais-pra-frente",
  },
  android: {
    id: "android",
    nome: "Android",
    principal: ".apk",
    alternativos: [],
    artefato: "ato20.apk",
    // O mobile sai depois do desktop: a interface precisa ser refeita.
    previsao: "mais-pra-frente",
  },
  ios: {
    id: "ios",
    nome: "iOS",
    // O iOS não sai como arquivo: quando existir, é TestFlight.
    principal: "",
    alternativos: [],
    artefato: "TestFlight",
    previsao: "mais-pra-frente",
  },
};

function acharNaRelease(sufixo: string): ArquivoDeRelease | null {
  if (!sufixo) return null;

  return (
    ULTIMA_RELEASE?.arquivos.find((arquivo) => arquivo.nome.endsWith(sufixo)) ??
    null
  );
}

/** O arquivo que o botão de download entrega, se a release já publicou um. */
export function arquivoPrincipal(id: PlataformaId): ArquivoDeRelease | null {
  return acharNaRelease(PLATAFORMAS[id].principal);
}

/** Os outros formatos da mesma plataforma que a release trouxe. */
export function arquivosAlternativos(id: PlataformaId): ArquivoDeRelease[] {
  return PLATAFORMAS[id].alternativos
    .map(acharNaRelease)
    .filter((arquivo): arquivo is ArquivoDeRelease => arquivo !== null);
}

export const ORDEM_PLATAFORMAS: PlataformaId[] = [
  "linux",
  "windows",
  "macos",
  "android",
  "ios",
];

/** Fallback quando não dá pra saber o sistema (SSR, bot, UA travado). */
export const PLATAFORMA_PADRAO: PlataformaId = "linux";

export function detectarPlataforma(): PlataformaId {
  if (typeof navigator === "undefined") return PLATAFORMA_PADRAO;

  const dados = (navigator as Navigator & { userAgentData?: { platform?: string } })
    .userAgentData;
  const alvo = `${dados?.platform ?? ""} ${navigator.userAgent}`.toLowerCase();

  if (alvo.includes("android")) return "android";
  if (/iphone|ipad|ipod/.test(alvo)) return "ios";
  // iPadOS 13+ se anuncia como Mac; o toque é o que separa os dois.
  if (alvo.includes("mac")) return navigator.maxTouchPoints > 1 ? "ios" : "macos";
  if (alvo.includes("win")) return "windows";
  if (/linux|x11|cros/.test(alvo)) return "linux";

  return PLATAFORMA_PADRAO;
}
