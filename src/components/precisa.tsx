import { Check, X } from "lucide-react";

const NAO_PRECISA = [
  "conta",
  "servidor",
  "assinatura",
  "internet durante a sessão",
  "miniatura, mapa impresso ou dado físico",
];

const PRECISA = [
  "um computador pro mestre, com Linux ou Windows",
  "uma tela pra janela do espectador: TV, monitor, projetor ou outro notebook",
  "o celular de quem joga, se quiser ficha e dado na mão",
  "todo mundo na mesma rede",
];

/**
 * O que a mesa pede para existir, e o que ela não pede.
 *
 * Era uma linha no meio da seção das três telas — "sem servidor e sem conta" —,
 * e é uma das coisas que mais separam o ATO20 de um VTT online. Em lista fica
 * respondida a pergunta de quem está decidindo se testa: "o que eu tenho que
 * arrumar antes?".
 *
 * A "internet durante a sessão" é verdade medida, não aproximação: o espectador e
 * os celulares recebem tudo do daemon na rede de casa, e o aplicativo embute as
 * próprias fontes. O que usa internet é opcional — o aviso de versão nova e o
 * retrato ao vivo.
 */
export function Precisa() {
  return (
    <section className="relative isolate mx-auto w-full max-w-3xl overflow-hidden px-6 py-16 sm:py-20 xl:max-w-7xl xl:px-12">
      <div className="surgir">
        <p className="font-mono text-sm text-muted-foreground">
          <span className="text-accent">{"//"}</span> o que você precisa
        </p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Sem conta. Sem servidor.
          <br />
          Sem assinatura.
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
          Quem serve a janela do espectador e os celulares é o próprio aplicativo, na
          rede da sua casa.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <div className="surgir rounded-xl border border-border bg-muted/20 p-6 sm:p-8">
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            não precisa de
          </p>
          <ul className="mt-5 space-y-3">
            {NAO_PRECISA.map((item) => (
              <li key={item} className="flex items-start gap-3 text-muted-foreground">
                <X className="mt-1 size-4 shrink-0 text-muted-foreground/60" strokeWidth={1.75} />
                <span className="line-through decoration-border">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="surgir rounded-xl border border-border bg-muted/20 p-6 sm:p-8">
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            só precisa de
          </p>
          <ul className="mt-5 space-y-3">
            {PRECISA.map((item) => (
              <li key={item} className="flex items-start gap-3 text-foreground">
                <Check className="mt-1 size-4 shrink-0 text-accent" strokeWidth={1.75} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
