// GERADO por scripts/gerar-releases.mjs a partir da API do GitHub.
// Não edite na mão: rode `pnpm gerar:releases`.

export type ArquivoDeRelease = {
  nome: string;
  url: string;
  bytes: number;
};

export type Release = {
  tag: string;
  nome: string;
  /** ISO 8601, em UTC. Quem formata é quem mostra. */
  publicadaEm: string;
  prerelease: boolean;
  pagina: string;
  /** Markdown como o GitHub guardou. Ver `notas-de-release.tsx`. */
  notas: string;
  arquivos: ArquivoDeRelease[];
};

/** Da mais nova pra mais velha, que é como a API devolve. */
export const RELEASES: Release[] = [
  {
    "tag": "v0.1.0",
    "nome": "ATO20 v0.1.0",
    "publicadaEm": "2026-09-18T12:34:10Z",
    "prerelease": false,
    "pagina": "https://github.com/ato20-org/desktop.ato20/releases/tag/v0.1.0",
    "notas": "Primeira beta. Da 0.0.6 para cá são cem commits, e — o que importa mais — **o aplicativo instalado volta a avisar quando sai versão nova**.\n\n## Novidades\n\n**O aplicativo passa a avisar sozinho quando existe versão nova**\nAté aqui toda versão saiu marcada como pré-lançamento, e o endereço que o aplicativo consulta ignora pré-lançamento — quem baixou a 0.0.1 ficou na 0.0.1 sem nunca saber que havia seis versões depois. Desta em diante o aviso chega sozinho.\n\n**A campanha ganha quadros: uma folha sem chão para o mestre pensar**\nO quadro fica na aba ao lado de Cenas, com pastas dentro de pastas. Nele você escreve texto direto na folha, liga as coisas com setas — de ponta solta ou grudada no que você mover — e mistura post-it, imagem, dado e cartão no mesmo lugar. Pôr o quadro no ar mostra a folha inteira na TV e no celular.\n\n**Documento: um cartão de Markdown com prévia ao vivo**\nVocê escreve de um lado e vê formatado do outro. No começo da linha, # dá título, ## subtítulo e - item de lista; @, / e > chamam referência, comando e citação, tanto na nota quanto no cartão.\n\n**A aba Arquivos põe quadros, notas e imagens na mesma árvore de pastas**\nQualquer arquivo entra no acervo agora, e a aba Imagens virou Biblioteca. A nota passou a ser arquivo da campanha: o cartão no quadro só aponta para ela, então a mesma nota pode aparecer em dois quadros sem virar duas cópias. Arrastar a nota da árvore até o quadro funciona como com imagem.\n\n**Ctrl+K abre uma paleta de comandos**\nEla acha janela, cena, livro, imagem e atalho pelo nome, sem você ter de lembrar em que painel aquilo estava.\n\n**Dá para jogar dados por notação, como \"2d6\", sem pegar no saquinho**\n\n**O saquinho ganha o d% de dezenas e a moeda de cara ou coroa**\nO celular do jogador também pede os dois, e a mesa passa a ler \"Coroa\" e \"d%\" em vez de \"2\" e \"d2\".\n\n**A régua virou medidor que fica no mapa, com círculo, cone e retângulo**\nAntes a medida sumia quando você soltava o mouse. Agora ela fica posta na cena, e a forma diz o que você está medindo.\n\n**A estante mostra os livros com capa, em caixa 2.5D, e o clique abre o PDF**\nHá também um comando para abrir o livro no leitor de PDF da máquina. A capa fica guardada depois da primeira vez, então a estante não pisca ao reabrir.\n\n**A cena guarda um handout: imagens do acervo que você manda à mesa uma a uma**\nA bolinha recebe imagens arrastadas e as leva à TV; o que já está na mesa volta para a manga pela mesma bolinha ou pelo menu. O painel ganhou título e uma caixinha de + que escolhe imagens do computador.\n\n**A janela \"Mesa\" mostra o que a TV está vendo, em miniatura, na sua tela**\n\n**Girar pelos cantos do gizmo, como no Figma**\nO botão de rotacionar saiu. A roda do mouse redimensiona a imagem na mão e Shift gira; as setas do teclado andam cinco de cada vez, e com Shift giram a seleção. Segurando a alça da câmera, a roda dá zoom nela.\n\n**Dá para afastar até 50%, com vazio em volta do mapa**\n\n**A cena nasce sem câmera, e a mesa vê tudo até a primeira entrar**\nAntes a cena nova já vinha com um enquadramento que você não escolheu. O botão \"Mesa\" também saiu da barra de cima.\n\n**A lista de personagens separa Players em cima e NPCs embaixo**\n\n**A ficha mostra quem está jogando com ela, e o diálogo do jogador diz há quanto tempo**\nDá para entregar o personagem a outra pessoa dali, e tirar alguém da mesa passa a pedir confirmação. A nota fechada do personagem fica guardada.\n\n**A porta mudou: botões no alto, \"Encontrar campanha\" e o mapa da cena ao fundo do cartão**\nA estante ganhou botão e aceita arquivo solto, \"O que mudou\" virou botão ao lado das Configurações, e a estante vazia virou um alvo tracejado em vez de um espaço em branco.\n\n**Esc larga a ferramenta, e um X na barra faz o mesmo**\n\n**O palco vazio mostra a marca e os atalhos principais**\n\n**A tela diz qual pasta da campanha sumiu, em vez de abrir uma mesa vazia**\n\n## Correções\n\n**Apagar a pasta da campanha com a mesa aberta virava mesa vazia, e a gravação recriava a pasta pela metade**\n\n**No leitor, dar zoom deixava a folha branca por um instante**\nA página que você está lendo passa na frente das vizinhas, e trocar de página depressa não deixa mais um desenho cancelado na tela.\n\n**A máscara escura da câmera cobria o post-it e os controles do mestre**\n\n**O clique fora do mapa tinha deixado de valer**\nA borda saiu e o vazio em volta ganhou pontos.\n\n**O token achatava ao encolher, em vez de parar no piso**\n\n**O d% nascia sem valor, e a soma da mesa dava NaN**\n\n**A ficha só via quem entrou na mesa depois de reabrir o programa**\n\n**O diálogo de Configurações prendia o foco e matava a barra da janela**\n\n**O rótulo da câmera não cabia quando a moldura ficava pequena na tela**\n\n**No quadro, o dado caía puxado para o plano, e não onde a mão soltou**\n\n**No quadro, o texto novo nascia invisível e sem foco**\n\n**A bancada já arrumada não ganhava a aba Quadros ao lado de Cenas**\n\n**O arquivo da extensão se chama manifest.json, e não manifesto.json**\n\n---\n\n**Linux** — `.AppImage` roda sem instalar, e na primeira abertura ele mesmo põe o atalho no menu (rofi, wofi e afins). Basta dar permissão de execução: `chmod +x ato20_*.AppImage`. `.deb` e `.rpm` para quem prefere instalar pelo gerenciador.\n\n**Windows** — `.msi` ou o instalador `.exe`. Os dois saem SEM assinatura de código, então o SmartScreen vai avisar: \"Mais informações\" e \"Executar mesmo assim\".",
    "arquivos": [
      {
        "nome": "ato20-0.1.0-1.x86_64.rpm",
        "url": "https://github.com/ato20-org/desktop.ato20/releases/download/v0.1.0/ato20-0.1.0-1.x86_64.rpm",
        "bytes": 15371333
      },
      {
        "nome": "ato20_0.1.0_amd64.AppImage",
        "url": "https://github.com/ato20-org/desktop.ato20/releases/download/v0.1.0/ato20_0.1.0_amd64.AppImage",
        "bytes": 102984184
      },
      {
        "nome": "ato20_0.1.0_amd64.deb",
        "url": "https://github.com/ato20-org/desktop.ato20/releases/download/v0.1.0/ato20_0.1.0_amd64.deb",
        "bytes": 15446296
      },
      {
        "nome": "ato20_0.1.0_x64-setup.exe",
        "url": "https://github.com/ato20-org/desktop.ato20/releases/download/v0.1.0/ato20_0.1.0_x64-setup.exe",
        "bytes": 10479069
      },
      {
        "nome": "ato20_0.1.0_x64_en-US.msi",
        "url": "https://github.com/ato20-org/desktop.ato20/releases/download/v0.1.0/ato20_0.1.0_x64_en-US.msi",
        "bytes": 13680283
      }
    ]
  },
  {
    "tag": "v0.0.6-alpha",
    "nome": "ATO20 v0.0.6 alpha",
    "publicadaEm": "2026-09-16T14:25:26Z",
    "prerelease": true,
    "pagina": "https://github.com/ato20-org/desktop.ato20/releases/tag/v0.0.6-alpha",
    "notas": "## Novidades\n\n**A cena tem câmeras com nome, e você escolhe qual delas está no ar**\nCada câmera é um enquadramento guardado do mapa. Elas ficam numa pílula no alto da mesa, e transmitir é escolher uma — a que está no ar aparece marcada, e as outras ficam apagadas no palco, para você ver o que os jogadores não estão vendo. Trocar de câmera corta em fade na TV, e sem nenhuma no ar a mesa fica escura. Segurando V, o mouse vira cinegrafista e move o enquadramento sem mexer no mapa.\n\n**O acervo e a lista \"Em cena\" ganharam pastas**\nPasta dentro de pasta, e arrastar uma pasta para dentro de outra. No acervo, Ctrl e Shift selecionam várias imagens de uma vez. Na lista \"Em cena\", clicar num item do mapa já pega a pasta inteira a que ele pertence.\n\n**Importar arquivo grande não trava mais a janela, e dá para cancelar no meio**\nA cópia saiu da thread da janela: um aviso mostra o que está entrando, quanto falta e um botão de parar. A miniatura de um mapa de 50 megapixels agora sai em menos de um segundo.\n\n**Arquivo largado no painel de imagens entra no acervo**\n\n**A área do mapa cresce com o que você coloca nela**\nAntes o plano tinha um tamanho fixo e o que passava da borda ficava fora do alcance. Agora ele acompanha as peças.\n\n**A barra de ferramentas virou duas bolsas**\nA grade e a régua foram para a bolsa do mapa.\n\n**O que a mesa tirou nas rolagens vira janela da bancada**\n\n**O alfinete alterna a nota do ponto, e a bolinha do saquinho vira X enquanto ele está aberto**\nDois botões que antes só tinham ida: agora clicar de novo desfaz, e o ícone diz em que estado você está.\n\n## Correções\n\n**Trocar o mapa de fundo três vezes seguidas importava o mesmo arquivo três vezes**\nTrês cópias do mesmo mapa pesado dentro da campanha.\n\n**Abrir a tela do espectador no navegador falhava calado**\nEm máquina Linux sem o `xdg-open`, o botão não fazia nada e não dizia por quê.\n\n**Renomear pelo menu não fazia nada, e agora F2 também renomeia**\n\n**O botão de tirar o post-it se escondia, e a prévia não mostrava onde o papel ia cair**\n\n**No celular do jogador, o esmaecido da rolagem comia o texto da ficha**\n\n**A mesa aceitava dado sem fim**\nAgora o teto é cinquenta dados por rolagem.",
    "arquivos": [
      {
        "nome": "ato20-0.0.6-1.x86_64.rpm",
        "url": "https://github.com/ato20-org/desktop.ato20/releases/download/v0.0.6-alpha/ato20-0.0.6-1.x86_64.rpm",
        "bytes": 15255775
      },
      {
        "nome": "ato20_0.0.6_amd64.AppImage",
        "url": "https://github.com/ato20-org/desktop.ato20/releases/download/v0.0.6-alpha/ato20_0.0.6_amd64.AppImage",
        "bytes": 102865400
      },
      {
        "nome": "ato20_0.0.6_amd64.deb",
        "url": "https://github.com/ato20-org/desktop.ato20/releases/download/v0.0.6-alpha/ato20_0.0.6_amd64.deb",
        "bytes": 15328252
      },
      {
        "nome": "ato20_0.0.6_x64-setup.exe",
        "url": "https://github.com/ato20-org/desktop.ato20/releases/download/v0.0.6-alpha/ato20_0.0.6_x64-setup.exe",
        "bytes": 10374324
      },
      {
        "nome": "ato20_0.0.6_x64_en-US.msi",
        "url": "https://github.com/ato20-org/desktop.ato20/releases/download/v0.0.6-alpha/ato20_0.0.6_x64_en-US.msi",
        "bytes": 13577883
      }
    ]
  },
  {
    "tag": "v0.0.5-alpha",
    "nome": "ATO20 v0.0.5 alpha",
    "publicadaEm": "2026-09-15T16:27:00Z",
    "prerelease": true,
    "pagina": "https://github.com/ato20-org/desktop.ato20/releases/tag/v0.0.5-alpha",
    "notas": "## Novidades\n\n**A lista de novidades cabe numa tela, e cada linha abre quando você quer o detalhe**\nCom treze mudanças, a 0.0.4 virou uma parede de texto na tela de entrada e nas Configurações. Agora os títulos ficam à vista, separados entre o que é novo e o que foi consertado, e o detalhe de cada um abre com um clique. As versões anteriores vêm fechadas, uma linha cada, já dizendo quantas mudanças têm dentro.",
    "arquivos": [
      {
        "nome": "ato20-0.0.5-1.x86_64.rpm",
        "url": "https://github.com/ato20-org/desktop.ato20/releases/download/v0.0.5-alpha/ato20-0.0.5-1.x86_64.rpm",
        "bytes": 15219336
      },
      {
        "nome": "ato20_0.0.5_amd64.AppImage",
        "url": "https://github.com/ato20-org/desktop.ato20/releases/download/v0.0.5-alpha/ato20_0.0.5_amd64.AppImage",
        "bytes": 102803960
      },
      {
        "nome": "ato20_0.0.5_amd64.deb",
        "url": "https://github.com/ato20-org/desktop.ato20/releases/download/v0.0.5-alpha/ato20_0.0.5_amd64.deb",
        "bytes": 15290796
      },
      {
        "nome": "ato20_0.0.5_x64-setup.exe",
        "url": "https://github.com/ato20-org/desktop.ato20/releases/download/v0.0.5-alpha/ato20_0.0.5_x64-setup.exe",
        "bytes": 10300290
      },
      {
        "nome": "ato20_0.0.5_x64_en-US.msi",
        "url": "https://github.com/ato20-org/desktop.ato20/releases/download/v0.0.5-alpha/ato20_0.0.5_x64_en-US.msi",
        "bytes": 13541019
      }
    ]
  },
  {
    "tag": "v0.0.4-alpha",
    "nome": "ATO20 v0.0.4 alpha",
    "publicadaEm": "2026-09-15T15:40:55Z",
    "prerelease": true,
    "pagina": "https://github.com/ato20-org/desktop.ato20/releases/tag/v0.0.4-alpha",
    "notas": "## Novidades\n\n**Arrastar um personagem, uma imagem ou um item até o mapa mostra onde ele vai cair, e de que tamanho**\nA sombra da peça acompanha o ponteiro, no lugar e no tamanho exatos em que ela vai ficar, e a roda do mouse escolhe o tamanho sem soltar o arrasto — entre um quarto e quatro vezes. Antes a peça só aparecia depois de solta, e cair torta custava dois ajustes com o gizmo.\n\n**Um arquivo arrastado do gerenciador de arquivos cai no mapa onde a mão soltou**\nEle entra no acervo e vai à cena no mesmo gesto, já selecionado. Vários de uma vez entram em escada, para nenhum ficar escondido embaixo do outro. O que não é imagem nem som é recusado.\n\n**O aplicativo diz em que versão está, e o que mudou**\nEsta lista. Ela viaja dentro do pacote, então continua legível na mesa sem Wi-Fi.\n\n**A tela de entrada é uma só, com as novidades num painel ao lado**\nAntes havia duas telas diferentes conforme você já tivesse ou não uma campanha na lista. Agora é a mesma, e o histórico inteiro fica num painel próprio encostado na borda da janela, com rolagem própria.\n\n**As abas e os divisores da bancada ficaram visíveis**\nAs abas passam a ler como aba, coladas no painel que abrem, e cada divisor entre colunas ganhou uma alça que acende quando a mão chega perto — antes era um fio invisível que só se revelava ao ser acertado.\n\n## Correções\n\n**Abrir o aplicativo entrava direto na última campanha**\nA lista de campanhas só aparecia na primeira execução ou depois de fechar a mesa. Quem tem duas campanhas esperava a errada ser lida do disco inteira antes de poder trocar. Recarregar a janela na tela de entrada também caía dentro de uma campanha.\n\n**Trocar de campanha mantinha o elenco da anterior**\nOs personagens da campanha antiga apareciam na nova, e o nome do token vinha errado junto. Só recarregando a janela voltava ao certo.\n\n**O mapa ampliado borrava, espremia e engrossava os controles**\nTrês defeitos do zoom, no mesmo lugar: o mapa e os tokens saíam borrados, passado mais ou menos 400% o mapa encolhia num eixo só e sumia, e o traço dos ícones do gizmo engrossava conforme se ampliava.\n\n**A nota fixada no mapa não arrastava, e o zoom deformava o cartão**\nO cabeçalho do cartão é a alça, e ele não respondia ao arrasto. Junto: clicar no mapa com o cursor dentro do título ou do corpo da nota deixava o campo focado, e o que se digitasse depois — atalho de tecla inclusive — ia para a nota em vez de ir para a mesa.\n\n**Tirar ou trocar o mapa de fundo devolvia o arquivo ao acervo**\nO mapa entrou na campanha para ser o fundo daquela cena. Agora, tirado o fundo, ele sai da campanha em vez de virar mais um arquivo pesado para apagar depois.\n\n**O arquivo recém-importado não chegava a todas as telas**\nAnexar uma miniatura na ficha do personagem não atualizava o acervo, e o botão de pôr o token no mapa ficava desabilitado dizendo “Lendo o acervo” até o aplicativo ser reaberto.\n\n**Rolar a tela de entrada levava a barra de título embora**\nA barra saía por cima e o conteúdo era cortado.\n\n**A tela de carregamento dizia “Abrindo a campanha” sem abrir campanha nenhuma**\nO que ela espera ali é a lista de campanhas da máquina, e ela ainda chegava depois do trabalho já feito.",
    "arquivos": [
      {
        "nome": "ato20-0.0.4-1.x86_64.rpm",
        "url": "https://github.com/ato20-org/desktop.ato20/releases/download/v0.0.4-alpha/ato20-0.0.4-1.x86_64.rpm",
        "bytes": 15218901
      },
      {
        "nome": "ato20_0.0.4_amd64.AppImage",
        "url": "https://github.com/ato20-org/desktop.ato20/releases/download/v0.0.4-alpha/ato20_0.0.4_amd64.AppImage",
        "bytes": 102812152
      },
      {
        "nome": "ato20_0.0.4_amd64.deb",
        "url": "https://github.com/ato20-org/desktop.ato20/releases/download/v0.0.4-alpha/ato20_0.0.4_amd64.deb",
        "bytes": 15289770
      },
      {
        "nome": "ato20_0.0.4_x64-setup.exe",
        "url": "https://github.com/ato20-org/desktop.ato20/releases/download/v0.0.4-alpha/ato20_0.0.4_x64-setup.exe",
        "bytes": 10309775
      },
      {
        "nome": "ato20_0.0.4_x64_en-US.msi",
        "url": "https://github.com/ato20-org/desktop.ato20/releases/download/v0.0.4-alpha/ato20_0.0.4_x64_en-US.msi",
        "bytes": 13545115
      }
    ]
  },
  {
    "tag": "v0.0.3-alpha",
    "nome": "ATO20 v0.0.3 alpha",
    "publicadaEm": "2026-09-14T19:13:31Z",
    "prerelease": true,
    "pagina": "https://github.com/ato20-org/desktop.ato20/releases/tag/v0.0.3-alpha",
    "notas": "Ainda é alpha: espere coisa quebrada.\n\n**Linux** — `.AppImage` roda sem instalar, e na primeira abertura\nele mesmo põe o atalho no menu (rofi, wofi e afins). Basta dar\npermissão de execução: `chmod +x ato20_*.AppImage`. `.deb` e `.rpm`\npara quem prefere instalar pelo gerenciador.\n**Windows** — `.msi` ou o instalador `.exe`. Os dois saem SEM\nassinatura de código, então o SmartScreen vai avisar: \"Mais\ninformações\" e \"Executar mesmo assim\".",
    "arquivos": [
      {
        "nome": "ato20-0.0.3-1.x86_64.rpm",
        "url": "https://github.com/ato20-org/desktop.ato20/releases/download/v0.0.3-alpha/ato20-0.0.3-1.x86_64.rpm",
        "bytes": 15275169
      },
      {
        "nome": "ato20_0.0.3_amd64.AppImage",
        "url": "https://github.com/ato20-org/desktop.ato20/releases/download/v0.0.3-alpha/ato20_0.0.3_amd64.AppImage",
        "bytes": 102861304
      },
      {
        "nome": "ato20_0.0.3_amd64.deb",
        "url": "https://github.com/ato20-org/desktop.ato20/releases/download/v0.0.3-alpha/ato20_0.0.3_amd64.deb",
        "bytes": 15348876
      },
      {
        "nome": "ato20_0.0.3_x64-setup.exe",
        "url": "https://github.com/ato20-org/desktop.ato20/releases/download/v0.0.3-alpha/ato20_0.0.3_x64-setup.exe",
        "bytes": 10393708
      },
      {
        "nome": "ato20_0.0.3_x64_en-US.msi",
        "url": "https://github.com/ato20-org/desktop.ato20/releases/download/v0.0.3-alpha/ato20_0.0.3_x64_en-US.msi",
        "bytes": 13633479
      }
    ]
  }
];

export const ULTIMA_RELEASE: Release | undefined = RELEASES[0];
