export type PlataformaId = "linux" | "windows" | "macos" | "android" | "ios";

export type Plataforma = {
  id: PlataformaId;
  nome: string;
  /** Nome do artefato que a release vai publicar. Hoje é mockup: não existe build. */
  artefato: string;
  disponivel: boolean;
};

export const PLATAFORMAS: Record<PlataformaId, Plataforma> = {
  linux: {
    id: "linux",
    nome: "Linux",
    artefato: "ato20_0.1.0_amd64.AppImage",
    disponivel: false,
  },
  windows: {
    id: "windows",
    nome: "Windows",
    artefato: "ato20_0.1.0_x64-setup.exe",
    disponivel: false,
  },
  macos: {
    id: "macos",
    nome: "macOS",
    artefato: "ato20_0.1.0_universal.dmg",
    disponivel: false,
  },
  android: {
    id: "android",
    nome: "Android",
    artefato: "ato20_0.1.0.apk",
    disponivel: false,
  },
  ios: {
    id: "ios",
    nome: "iOS",
    artefato: "TestFlight",
    disponivel: false,
  },
};

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
