import { ArrowDown } from "lucide-react";

import { AsciiLogo } from "@/components/ascii-logo";
import { Cabecalho } from "@/components/cabecalho";
import { Download } from "@/components/download";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="grade pointer-events-none absolute inset-0 -z-10" aria-hidden />

      <Cabecalho />

      {/* A coluna vai escrita como `minmax(0,1fr)` também fora do xl. Sem
          template, a coluna implícita é `auto`, que quer dizer max-content: um
          filho que não quebra linha -- o comando de download é um -- estica a
          coluna além do `max-w-3xl`, e o `overflow-hidden` da seção corta o
          hero inteiro em vez de o navegador mostrar que algo saiu do lugar. É
          a mesma razão pela qual o template do xl já nasceu com `minmax(0,…)`. */}
      <div className="revelar mx-auto grid w-full max-w-3xl grid-cols-[minmax(0,1fr)] gap-16 px-6 pt-12 pb-20 sm:pt-16 sm:pb-24 xl:max-w-7xl xl:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] xl:items-center xl:gap-12 xl:px-12">
        <div className="min-w-0">
          {/* O título é o alcance, e não um recurso: o ATO20 é a mesa, a
              campanha e o que se acrescenta a elas, e uma frase sobre câmera ou
              sobre visão do mestre descreveria só a sessão. A metáfora é uma
              só — a IDE, na linha de baixo —, e a categoria abre o parágrafo,
              colada ao nome, e segue no <title> da página. */}
          <h1 className="text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
            ATO20
            <span className="mt-3 block text-2xl font-normal text-muted-foreground sm:text-3xl">
              Tudo pra mestrar, num lugar só.
            </span>
          </h1>

          <p className="mt-7 font-mono text-sm text-muted-foreground">
            <span className="text-accent">{"//"}</span> a sua IDE para seu RPG de mesa
          </p>

          {/* Os três pilares, na ordem em que o mestre os usa: a sessão, a
              campanha entre uma sessão e outra, e o jeito dele de trabalhar. */}
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
            O VTT local pra RPG presencial. Prepare a próxima cena enquanto a
            mesa vê a atual, com a câmera na janela do espectador e cada jogador
            no próprio celular.
          </p>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Quadros, notas, personagens e arquivos: a campanha inteira mora numa
            pasta que é sua. E o resto fica do seu jeito, com temas, plugins e
            configurações.
          </p>

          <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
            <span>sem conta</span>
            <span className="text-border">·</span>
            <span>sem servidor</span>
            <span className="text-border">·</span>
            <span>sem assinatura</span>
          </p>

          <Download>
            {/* Para quem ainda não vai baixar: a seção da câmera é a que
                mostra o que o resto do texto promete. Seta para baixo, e não
                a diagonal do "Notas de atualização": este fica na página. */}
            <a
              href="#camera"
              className="inline-flex h-12 items-center justify-center gap-1.5 px-2 font-mono text-xs whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground sm:justify-start"
            >
              ver como funciona
              <ArrowDown className="size-3.5" strokeWidth={1.75} />
            </a>
          </Download>

        </div>

        {/* Fica na esquerda, mas depois do texto no DOM: o h1 é o começo do
            conteúdo, e o desenho é decoração `aria-hidden`.
            Só entra a partir de xl — em lg a coluna fica com ~224px, o que dá
            menos de 2px por caractere: vira borrão, não desenho. */}
        <AsciiLogo className="hidden xl:order-first xl:block" />
      </div>
    </section>
  );
}
