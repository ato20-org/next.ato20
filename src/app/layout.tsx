import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { FundoDeDados } from "@/components/fundo-de-dados";
import { Saquinho } from "@/components/saquinho";

import "./globals.css";

// Mesma dupla de fontes do app: a landing tem que parecer a ferramenta.
const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const TITULO = "ATO20 · o VTT local pra RPG presencial";

const DESCRICAO =
  "O ATO20 é um VTT open source pra RPG presencial: câmera na janela do espectador, cada jogador no próprio celular, quadros, notas, personagens e arquivos numa pasta que é sua, e plugins pra deixar do seu jeito. Roda na sua rede, sem conta e sem servidor.";

export const metadata: Metadata = {
  // O site tem domínio próprio: a base torna as URLs de OpenGraph/Twitter
  // absolutas em vez de relativas à origem do deploy.
  metadataBase: new URL("https://ato20.valbmig.com.br"),
  title: TITULO,
  description: DESCRICAO,
  openGraph: {
    title: TITULO,
    description: DESCRICAO,
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRICAO,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {/* Fora do `children`: o fundo é do site, e acompanha a rolagem de
            qualquer página. */}
        <FundoDeDados />
        {children}
        {/* Fora do `children`: o saquinho é do site, não de uma página. */}
        <Saquinho />
      </body>
    </html>
  );
}
