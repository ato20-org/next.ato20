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

const DESCRICAO =
  "O ATO20 é a IDE para mestrar RPG de mesa. Um VTT para jogo presencial: roda em LAN, na sua casa, com os seus amigos. Open source.";

export const metadata: Metadata = {
  title: "ATO20 — a IDE para RPG de mesa",
  description: DESCRICAO,
  openGraph: {
    title: "ATO20 — a IDE para RPG de mesa",
    description: DESCRICAO,
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "ATO20 — a IDE para RPG de mesa",
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
