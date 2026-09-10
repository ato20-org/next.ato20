# next.ato20

Landing page do [ATO20](https://github.com/valb-mig/ato20) — a IDE para RPG de mesa.

Next.js 16 (App Router, Turbopack) + Tailwind CSS 4. Tema escuro travado e a
mesma dupla de fontes do app (Geist / Geist Mono), pra a landing parecer a
ferramenta.

## Rodando

```bash
pnpm install
pnpm dev
```

Sobe em http://localhost:3011. A porta está fixa no `package.json` (`dev` e
`start`) porque o app do ATO20 ocupa a 3000, e os dois rodam juntos.

## Estado

- [x] Hero: frase, download com detecção de sistema, link do repositório
- [ ] Builds reais (hoje os botões de download são mockup, sem release publicada)
- [ ] Demais seções

Os artefatos de download estão em [`src/lib/plataformas.ts`](src/lib/plataformas.ts).
Quando a primeira release sair, é só marcar `disponivel: true` e apontar a URL.
