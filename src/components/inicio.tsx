import { Cortinas } from "@/components/cortinas";
import { Enquadramento } from "@/components/enquadramento";
import { Fechamento } from "@/components/fechamento";
import { Fluxo } from "@/components/fluxo";
import { Hero } from "@/components/hero";
import { Historia } from "@/components/historia";
import { Mesa } from "@/components/mesa";
import { Plugins } from "@/components/plugins";
import { Precisa } from "@/components/precisa";
import { Visoes } from "@/components/visoes";
import type { Idioma } from "@/lib/idioma";
import { metadados } from "@/lib/metadados";

const pt = {
  titulo: "ATO20 · o VTT local pra RPG presencial",
  descricao:
    "O ATO20 é um VTT open source pra RPG presencial: câmera na janela do espectador, cada jogador no próprio celular, quadros, notas, personagens e arquivos numa pasta que é sua, e plugins pra deixar do seu jeito. Roda na sua rede, sem conta e sem servidor.",
};

const en: typeof pt = {
  titulo: "ATO20 · the local VTT for in-person RPG",
  descricao:
    "ATO20 is an open source VTT for in-person tabletop RPG: a camera on the spectator window, every player on their own phone, boards, notes, characters and files in a folder that is yours, and plugins to make it your own. It runs on your network, with no account and no server.",
};

const TEXTO = { pt, en };

export function metadadosDoInicio(idioma: Idioma) {
  return metadados(idioma, "/", {
    titulo: TEXTO[idioma].titulo,
    descricao: TEXTO[idioma].descricao,
  });
}

/** A home, a mesma nos dois idiomas. */
export function Inicio({ idioma }: { idioma: Idioma }) {
  return (
    <>
      <Cortinas />
      <main className="min-h-dvh">
        <Hero idioma={idioma} />
        <Enquadramento idioma={idioma} />
        <Historia idioma={idioma} />
        <Plugins idioma={idioma} />
        <Fluxo idioma={idioma} />
        <Visoes idioma={idioma} />
        <Precisa idioma={idioma} />
        <Mesa idioma={idioma} />
        <Fechamento idioma={idioma} />
      </main>
    </>
  );
}
