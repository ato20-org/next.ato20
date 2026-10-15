// GERADO por scripts/gerar-contribuidores.mjs a partir da API do GitHub.
// Não edite na mão: rode `pnpm gerar:contribuidores`.

export type Contribuidor = {
  /** O login no GitHub, ou o nome do commit quando não há conta ligada. */
  nome: string;
  /** `null` para quem não tem conta ligada aos commits. */
  perfil: string | null;
  avatar: string | null;
  commits: number;
};

/** De quem mais contribuiu para quem menos, até o momento da geração. */
export const CONTRIBUIDORES: Contribuidor[] = [
  {
    "nome": "valb-mig",
    "perfil": "https://github.com/valb-mig",
    "avatar": "https://avatars.githubusercontent.com/u/102031404?v=4",
    "commits": 1039
  },
  {
    "nome": "xoykor",
    "perfil": "https://github.com/xoykor",
    "avatar": "https://avatars.githubusercontent.com/u/138058470?v=4",
    "commits": 2
  }
];
