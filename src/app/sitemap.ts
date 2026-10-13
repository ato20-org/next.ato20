import type { MetadataRoute } from "next";

import { PLUGINS } from "@/lib/catalogo";
import { caminho, type Rota } from "@/lib/idioma";
import { BASE } from "@/lib/metadados";

const ROTAS: Rota[] = [
  "/",
  "/plugins",
  ...PLUGINS.map((plugin): Rota => `/plugins/${plugin.id}`),
  "/releases",
];

/** As páginas nos dois idiomas, cada uma apontando a irmã. */
export default function sitemap(): MetadataRoute.Sitemap {
  const absoluto = (endereco: string) => new URL(endereco, BASE).toString();

  return ROTAS.flatMap((rota) => {
    const languages = {
      "pt-BR": absoluto(caminho("pt", rota)),
      en: absoluto(caminho("en", rota)),
    };

    return [
      { url: languages["pt-BR"], alternates: { languages } },
      { url: languages.en, alternates: { languages } },
    ];
  });
}
