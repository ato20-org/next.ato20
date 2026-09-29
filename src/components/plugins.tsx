import { type ReactNode } from "react";

/**
 * O que um plugin alcança. Cada linha sai da documentação do aplicativo
 * (`docs/extensoes.md`), que é a promessa da API 2: o que está aqui existe na
 * versão publicada.
 */
const RECURSOS = [
  {
    titulo: "Temas",
    linha: "Um arquivo de CSS que redeclara as cores do aplicativo. Sem ferramenta, sem build.",
  },
  {
    titulo: "Um sistema de regras",
    linha: "Iniciativa, ataque que já dá o dano, ficha com a cara de outro sistema: o plugin alcança personagens, medidores, condições e dados.",
  },
  {
    titulo: "Na mesa inteira",
    linha: "O medidor desenhado pelo plugin aparece na janela do espectador e no celular, sem código de plugin rodar fora do Mestre.",
  },
  {
    titulo: "No celular do jogador",
    linha: "Uma seção na ficha, com botão: o jogador aperta, e quem executa é o Mestre.",
  },
  {
    titulo: "Configurações, como no VSCode",
    linha: "Da máquina e da campanha, na tela ou em JSON. A da campanha vence a da máquina.",
  },
];

/**
 * Um manifesto que o aplicativo aceita como está: é o formato de
 * `docs/extensoes.md`, com a `apiVersao` atual. Inventar campo aqui venderia
 * uma API que não existe para quem copiar o exemplo.
 */
const MANIFESTO = `{
  "id": "iniciativa",
  "nome": "Iniciativa",
  "versao": "1.0.0",
  "apiVersao": 2,
  "principal": "main.js",
  "contribui": {
    "paineis": [
      { "id": "ordem", "titulo": "Ordem de iniciativa" }
    ],
    "comandos": [
      {
        "id": "rolar",
        "titulo": "Rolar iniciativa",
        "atalho": "Alt+I"
      }
    ]
  }
}`;

const TOKEN = /("(?:[^"\\]|\\.)*")(\s*:)?|(\d+)/g;

/**
 * Cor de editor no JSON, sem biblioteca de realce: chave apagada, texto na cor
 * de destaque, número claro. Três regras bastam para um manifesto, e trazer um
 * realçador para doze linhas pesaria mais que a seção inteira.
 */
function colorir(texto: string): ReactNode[] {
  const nos: ReactNode[] = [];
  let ultimo = 0;

  for (const achado of texto.matchAll(TOKEN)) {
    const inicio = achado.index;
    if (inicio > ultimo) {
      nos.push(
        <span key={`p${inicio}`} className="text-muted-foreground/60">
          {texto.slice(ultimo, inicio)}
        </span>,
      );
    }

    const [, cadeia, doisPontos, numero] = achado;
    if (cadeia && doisPontos) {
      nos.push(
        <span key={`c${inicio}`} className="text-muted-foreground">
          {cadeia}
        </span>,
        <span key={`d${inicio}`} className="text-muted-foreground/60">
          {doisPontos}
        </span>,
      );
    } else if (cadeia) {
      nos.push(
        <span key={`v${inicio}`} className="text-accent">
          {cadeia}
        </span>,
      );
    } else {
      nos.push(
        <span key={`n${inicio}`} className="text-foreground">
          {numero}
        </span>,
      );
    }

    ultimo = inicio + achado[0].length;
  }

  if (ultimo < texto.length) {
    nos.push(
      <span key="fim" className="text-muted-foreground/60">
        {texto.slice(ultimo)}
      </span>,
    );
  }

  return nos;
}

/**
 * Os plugins: o que faz o ATO20 ficar do jeito de cada mesa.
 *
 * O visual é o manifesto, e não uma captura, pelo mesmo motivo da árvore de
 * pastas da seção seguinte: a promessa é que um plugin é uma pasta com um
 * arquivo que se lê, e mostrar o arquivo é a prova. É também o que casa com a
 * IDE do hero — é assim que se estende um editor.
 */
export function Plugins() {
  return (
    <section className="relative isolate mx-auto w-full max-w-3xl overflow-hidden px-6 py-16 sm:py-20 xl:max-w-7xl xl:px-12">
      <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] xl:items-start xl:gap-16">
        <div>
          <div className="surgir">
            <p className="font-mono text-sm text-muted-foreground">
              <span className="text-accent">{"//"}</span> plugins
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Do jeito
              <br />
              da sua mesa.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
              Tema é um arquivo de CSS. Plugin é uma pasta com um manifesto:
              instalar é copiar a pasta, e a tela de Plugins mostra o que ele
              faz antes de rodar uma linha.
            </p>
          </div>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {RECURSOS.map(({ titulo, linha }) => (
              <li key={titulo} className="surgir">
                <h3 className="font-mono text-xs tracking-widest text-foreground uppercase">
                  {titulo}
                </h3>
                <p className="mt-2 leading-relaxed text-muted-foreground text-pretty">{linha}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="surgir min-w-0 xl:mt-12">
          <figure className="m-0 overflow-hidden rounded-xl border border-border bg-muted/20">
            <figcaption className="flex items-center gap-2 border-b border-border px-4 py-2.5 font-mono text-xs text-muted-foreground">
              <span className="text-border">iniciativa/</span>
              <span className="text-foreground">manifest.json</span>
            </figcaption>
            <div className="overflow-x-auto p-4 sm:p-6">
              <pre className="m-0 min-w-max font-mono text-xs leading-relaxed">
                <code>{colorir(MANIFESTO)}</code>
              </pre>
            </div>
          </figure>

          {/* A guarda que existe é contra plugin malformado, não contra plugin
              malicioso — e isso se diz, em vez de parecer uma loja revisada. */}
          <p className="mt-4 font-mono text-xs leading-relaxed text-muted-foreground">
            <span className="text-accent">{"//"}</span> plugin de funcionalidade
            roda com o alcance da janela do Mestre: instale de quem você confia,
            como num editor de código.
          </p>
        </div>
      </div>
    </section>
  );
}
