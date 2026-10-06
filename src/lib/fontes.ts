import { Geist, Geist_Mono } from "next/font/google";

/*
 * Mesma dupla de fontes do app: a landing tem que parecer a ferramenta.
 *
 * Num módulo próprio porque o site tem dois root layouts, um por idioma, e
 * `next/font` precisa ser chamado uma vez só, no escopo do módulo.
 */
export const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});
