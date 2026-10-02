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
    "tag": "v1.1.0",
    "nome": "ATO20 v1.1.0",
    "publicadaEm": "2026-10-02T20:20:02Z",
    "prerelease": false,
    "pagina": "https://github.com/ato20-org/ato20/releases/tag/v1.1.0",
    "notas": "## Novidades\n\n- **Mapa de esguelha (2.5D), em beta: a mesa vista de lado, com as paredes em pé.** No Mestre, o botão 2.5D ao lado das configurações do mapa mostra a mesa de esguelha: os personagens ficam em pé e as paredes sobem. Para a janela do espectador ver assim, crie um tripé na barra Tripés e transmita com T. No 2.5D dá para marcar, arrastar e deitar os personagens; mapa, luz e paredes continuam se editando no 2D. Shift+L entra no tripé e anda com ele, como num jogo.\n- **Mapas, Fundos, Personagens e Retratos ganharam pastas e busca.** Arraste um mapa ou um personagem para dentro de uma pasta, ou use \"Mover para\" no menu da linha. Players e NPCs têm cada um a sua árvore, e os retratos soltos aparecem sob a pasta do personagem. A busca acha pelo nome e pela pasta, e mostra o caminho de cada achado. A Biblioteca também ganhou busca.\n- **Recorte o retrato e a miniatura ao anexar, em quadrado ou em círculo.** Arraste para enquadrar e use a roda para aproximar, até 8 vezes. A miniatura abre no círculo, que é o token redondo da mesa. \"Usar inteira\" grava a imagem como ela veio, para a figura de corpo inteiro.\n- **Duplo clique num personagem no mapa abre a ficha dele.** Vale também para o token travado, e o token não sai do lugar junto.\n- **Plugins podem desenhar medidores com imagens.** Barra, pontos ou uma sequência de quadros, com o valor escrito dentro, só com imagens e um arquivo de configuração na pasta do plugin. No medidor, a paleta junta as formas de fábrica e as dos plugins, e dá para mostrar ou esconder o nome e o valor.\n\n## Correções\n\n- **Com a aba Mesa aberta, a mesa parava de acompanhar o Mestre.** A janela do espectador, o celular e a própria aba ficavam presos num quadro de minutos antes, sem aviso. Agora seguem a cena e a câmera como antes.\n- **Com muitas câmeras, a barra de câmeras atravessava a tela.** Agora ela para de crescer e rola, e as pontas esmaecem quando há câmera fora da vista.",
    "arquivos": [
      {
        "nome": "ato20-1.1.0-1.x86_64.rpm",
        "url": "https://github.com/ato20-org/ato20/releases/download/v1.1.0/ato20-1.1.0-1.x86_64.rpm",
        "bytes": 16304430
      },
      {
        "nome": "ato20_1.1.0_amd64.AppImage",
        "url": "https://github.com/ato20-org/ato20/releases/download/v1.1.0/ato20_1.1.0_amd64.AppImage",
        "bytes": 104450552
      },
      {
        "nome": "ato20_1.1.0_amd64.deb",
        "url": "https://github.com/ato20-org/ato20/releases/download/v1.1.0/ato20_1.1.0_amd64.deb",
        "bytes": 16380042
      },
      {
        "nome": "ato20_1.1.0_x64-setup.exe",
        "url": "https://github.com/ato20-org/ato20/releases/download/v1.1.0/ato20_1.1.0_x64-setup.exe",
        "bytes": 11311702
      },
      {
        "nome": "ato20_1.1.0_x64_en-US.msi",
        "url": "https://github.com/ato20-org/ato20/releases/download/v1.1.0/ato20_1.1.0_x64_en-US.msi",
        "bytes": 14707062
      }
    ]
  },
  {
    "tag": "v1.0.0",
    "nome": "ATO20 v1.0.0",
    "publicadaEm": "2026-10-01T20:49:46Z",
    "prerelease": false,
    "pagina": "https://github.com/ato20-org/ato20/releases/tag/v1.0.0",
    "notas": "Beta: dá para jogar com ele, e ainda há aresta.\n\n**Linux** — `.AppImage` roda sem instalar, e na primeira abertura\nele mesmo põe o atalho no menu (rofi, wofi e afins). Basta dar\npermissão de execução: `chmod +x ato20_*.AppImage`. `.deb` e `.rpm`\npara quem prefere instalar pelo gerenciador.\n**Windows** — `.msi` ou o instalador `.exe`. Os dois saem SEM\nassinatura de código, então o SmartScreen vai avisar: \"Mais\ninformações\" e \"Executar mesmo assim\".",
    "arquivos": [
      {
        "nome": "ato20-1.0.0-1.x86_64.rpm",
        "url": "https://github.com/ato20-org/ato20/releases/download/v1.0.0/ato20-1.0.0-1.x86_64.rpm",
        "bytes": 16162212
      },
      {
        "nome": "ato20_1.0.0_amd64.AppImage",
        "url": "https://github.com/ato20-org/ato20/releases/download/v1.0.0/ato20_1.0.0_amd64.AppImage",
        "bytes": 104307192
      },
      {
        "nome": "ato20_1.0.0_amd64.deb",
        "url": "https://github.com/ato20-org/ato20/releases/download/v1.0.0/ato20_1.0.0_amd64.deb",
        "bytes": 16224986
      },
      {
        "nome": "ato20_1.0.0_x64-setup.exe",
        "url": "https://github.com/ato20-org/ato20/releases/download/v1.0.0/ato20_1.0.0_x64-setup.exe",
        "bytes": 11196943
      },
      {
        "nome": "ato20_1.0.0_x64_en-US.msi",
        "url": "https://github.com/ato20-org/ato20/releases/download/v1.0.0/ato20_1.0.0_x64_en-US.msi",
        "bytes": 14541446
      }
    ]
  },
  {
    "tag": "v0.7.2",
    "nome": "ATO20 v0.7.2",
    "publicadaEm": "2026-09-29T21:51:04Z",
    "prerelease": false,
    "pagina": "https://github.com/ato20-org/ato20/releases/tag/v0.7.2",
    "notas": "## Novidades\n\n- **A câmera criada pela tecla N nasce onde o mouse está apontando.** Com o tamanho da câmera selecionada. Com o mouse fora do mapa, numa coluna ou numa janela por cima, ela nasce onde nascia antes.\n\n## Correções\n\n- **Criar uma câmera pela tecla N não troca mais o que a mesa está vendo.** A câmera nova entrava no ar na hora e cortava a cena da mesa. Agora ela nasce só selecionada, a mesa continua na câmera que estava, e o T põe a nova no ar quando for a hora. O botão + da pílula continua criando já no ar.",
    "arquivos": [
      {
        "nome": "ato20-0.7.2-1.x86_64.rpm",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.7.2/ato20-0.7.2-1.x86_64.rpm",
        "bytes": 15744216
      },
      {
        "nome": "ato20_0.7.2_amd64.AppImage",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.7.2/ato20_0.7.2_amd64.AppImage",
        "bytes": 103913976
      },
      {
        "nome": "ato20_0.7.2_amd64.deb",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.7.2/ato20_0.7.2_amd64.deb",
        "bytes": 15818914
      },
      {
        "nome": "ato20_0.7.2_x64-setup.exe",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.7.2/ato20_0.7.2_x64-setup.exe",
        "bytes": 10816493
      },
      {
        "nome": "ato20_0.7.2_x64_en-US.msi",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.7.2/ato20_0.7.2_x64_en-US.msi",
        "bytes": 14059592
      }
    ]
  },
  {
    "tag": "v0.7.1",
    "nome": "ATO20 v0.7.1",
    "publicadaEm": "2026-09-29T18:40:19Z",
    "prerelease": false,
    "pagina": "https://github.com/ato20-org/ato20/releases/tag/v0.7.1",
    "notas": "## Correções\n\n- **O mapa ficava preto na janela do espectador depois de desfazer uma troca de fundo.** Trocar ou tirar o fundo apaga o mapa antigo da campanha, e o Ctrl+Z devolvia a cena para ele. A tela seguia mostrando a imagem guardada, e a janela do espectador ficava preta mais tarde. O Ctrl+Z não mexe mais no fundo: para voltar ao mapa anterior, troque de novo pelo menu da cena.\n- **A seção de um plugin desligado continuava no celular do jogador.** Com um botão que não fazia mais nada. Agora ela some quando o plugin é desligado ou desinstalado, e volta com o que estava guardado se ele voltar.",
    "arquivos": [
      {
        "nome": "ato20-0.7.1-1.x86_64.rpm",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.7.1/ato20-0.7.1-1.x86_64.rpm",
        "bytes": 15742820
      },
      {
        "nome": "ato20_0.7.1_amd64.AppImage",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.7.1/ato20_0.7.1_amd64.AppImage",
        "bytes": 103909880
      },
      {
        "nome": "ato20_0.7.1_amd64.deb",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.7.1/ato20_0.7.1_amd64.deb",
        "bytes": 15818224
      },
      {
        "nome": "ato20_0.7.1_x64-setup.exe",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.7.1/ato20_0.7.1_x64-setup.exe",
        "bytes": 10816848
      },
      {
        "nome": "ato20_0.7.1_x64_en-US.msi",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.7.1/ato20_0.7.1_x64_en-US.msi",
        "bytes": 14026824
      }
    ]
  },
  {
    "tag": "v0.7.0",
    "nome": "ATO20 v0.7.0",
    "publicadaEm": "2026-09-29T15:13:34Z",
    "prerelease": false,
    "pagina": "https://github.com/ato20-org/ato20/releases/tag/v0.7.0",
    "notas": "## Novidades\n\n- **A grade do mapa pode ser de hexágonos.** Em pé ou deitados, nas configurações da grade. O ímã encaixa o token no centro da casa, e a casa embaixo do token fica acesa.\n- **Configurações ganhou a seção Ajustes, com busca e editor JSON.** Tudo que o ATO20 e os plugins deixam ajustar, numa lista só, por máquina e por campanha — a campanha vence. O botão JSON edita o arquivo cru, como no VSCode, e o ícone ao lado o abre no seu editor. O zoom, o aviso de versão e os volumes passaram a morar nesse arquivo.\n- **Plugins podem mudar a interface: menus, ficha, janelas e ferramentas.** Um plugin põe opções no botão direito do token, da luz, da área escondida e das listas; acrescenta seções na ficha do personagem; troca o miolo de uma seção ou uma janela inteira pela dele (desligar o plugin devolve a de fábrica); e a ferramenta dele ganha ícone, pílula de opções e prévia no arrasto.\n- **Plugins alcançam medidores, condições e dados.** Um plugin lê o elenco inteiro, ajusta medidores em lote, liga condições na horda, rola dados de verdade no palco e recebe aviso quando algo muda. Cada plugin guarda o que é dele em cada personagem, com uma parte que só o mestre vê. É o que faltava para iniciativa, botão de ataque e habilidades existirem como plugin.\n- **O medidor pode ter o desenho do plugin, na TV e no celular.** Um coração que esvazia, uma barra que pulsa: o plugin traz um SVG com variáveis e a mesa inteira o desenha. Sem código do plugin rodando fora do seu computador; a TV que não tem o plugin mostra a barra de sempre.\n- **O plugin pode pôr uma seção com botões no celular do jogador.** Texto, valores e botões. Apertar manda a ação ao mestre, e é o plugin que decide o que ela faz; o resultado aparece na mesa. A ficha do jogador passou a se atualizar sozinha quando o mestre mexe nela.\n\n## Correções\n\n- **Um plugin com defeito não derruba mais a tela do mestre.** O erro aparece dentro do painel dele, com o motivo, e o resto continua. Escolher a ferramenta de um plugin passou a funcionar sem antes abrir um painel dele.\n- **O quadro não levava para a mesa o que um plugin guardou nele.** Cena de mapa já escondia; o quadro passava tudo. Agora os dois escondem.\n- **Postit e cartão passaram a aceitar o botão direito.**\n\nQuem escreve plugin: a seção **Extensões** do README descreve a API 2 inteira — manifesto, `api.janelas`, `api.config`, `api.personagens`, `api.dados`, `api.eventos`, os encaixes, o SVG de medidor e a seção do celular.",
    "arquivos": [
      {
        "nome": "ato20-0.7.0-1.x86_64.rpm",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.7.0/ato20-0.7.0-1.x86_64.rpm",
        "bytes": 15742242
      },
      {
        "nome": "ato20_0.7.0_amd64.AppImage",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.7.0/ato20_0.7.0_amd64.AppImage",
        "bytes": 103909880
      },
      {
        "nome": "ato20_0.7.0_amd64.deb",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.7.0/ato20_0.7.0_amd64.deb",
        "bytes": 15816864
      },
      {
        "nome": "ato20_0.7.0_x64-setup.exe",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.7.0/ato20_0.7.0_x64-setup.exe",
        "bytes": 10813364
      },
      {
        "nome": "ato20_0.7.0_x64_en-US.msi",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.7.0/ato20_0.7.0_x64_en-US.msi",
        "bytes": 14063688
      }
    ]
  },
  {
    "tag": "v0.6.0",
    "nome": "ATO20 v0.6.0",
    "publicadaEm": "2026-09-29T00:15:43Z",
    "prerelease": false,
    "pagina": "https://github.com/ato20-org/ato20/releases/tag/v0.6.0",
    "notas": "## Novidades\n\n**O personagem ganhou condições.** Envenenado, caído, abençoado: um selo com nome, ícone e cor, na ficha logo abaixo dos medidores. A campanha tem um cardápio delas, e \"Usar sugestões\" cria oito prontas. Uma condição escondida não sai do seu computador.\n\n**A condição muda a figura.** Aura, tingido, translúcido, tremendo ou apagado, no token e no retrato. Os selos aparecem sobre o token, no alto do retrato e no celular do dono, e se arrastam no layout do retrato como as outras peças.\n\n**Dá para envenenar a horda de uma vez.** O submenu Condições do botão direito vale para a seleção inteira.\n\n**A lanterna do token vira facho, e gira com a figura.** Aponte uma vez para onde o rosto do desenho olha; dali em diante, girar o token gira o facho.\n\n**O menu do token caiu para a metade das linhas.** O que é da cena — colar, selecionar tudo, câmera — mora no botão direito do vazio. Espelhar, Ordem e Câmera viraram submenus.",
    "arquivos": [
      {
        "nome": "ato20-0.6.0-1.x86_64.rpm",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.6.0/ato20-0.6.0-1.x86_64.rpm",
        "bytes": 15653466
      },
      {
        "nome": "ato20_0.6.0_amd64.AppImage",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.6.0/ato20_0.6.0_amd64.AppImage",
        "bytes": 103815672
      },
      {
        "nome": "ato20_0.6.0_amd64.deb",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.6.0/ato20_0.6.0_amd64.deb",
        "bytes": 15727574
      },
      {
        "nome": "ato20_0.6.0_x64-setup.exe",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.6.0/ato20_0.6.0_x64-setup.exe",
        "bytes": 10728493
      },
      {
        "nome": "ato20_0.6.0_x64_en-US.msi",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.6.0/ato20_0.6.0_x64_en-US.msi",
        "bytes": 13961288
      }
    ]
  },
  {
    "tag": "v0.5.0",
    "nome": "ATO20 v0.5.0",
    "publicadaEm": "2026-09-29T00:07:20Z",
    "prerelease": false,
    "pagina": "https://github.com/ato20-org/ato20/releases/tag/v0.5.0",
    "notas": "## Novidades\n\n**O mapa pode ficar escuro, e o escuro tem tom.** A régua de Escuridão fica nas Configurações do mapa, ao lado do sol, com os tons Breu, Noite, Caverna e Abismo, ou uma cor sua. A mesa vê o escuro inteiro; você vê mais fraco, para conseguir trabalhar dentro dele.\n\n**A tocha volta: a ferramenta Luz crava uma luz no mapa.** Seis climas prontos — chama, vela, lua, magia, veneno e sangue —, cor livre e intensidade. São dois alcances: onde dá para ler o mapa, e até onde se enxerga algum vulto.\n\n**O token pode carregar uma lanterna.** Pelo botão direito, em três alcances. Ela anda com o personagem, na TV e no celular também.\n\n**A parede corta a luz, e o token faz sombra e ganha volume nela.** Atrás de uma parede continua escuro. Cada token deita uma silhueta para longe de cada chama e fica mais claro do lado virado para ela: três tochas numa sala dão três vultos por goblin.\n\n**A luz liga e desliga, vira cone e tremula.** Desligada, ela guarda a cor e o alcance para quando voltar. O cone aponta e abre pelas alças. Os efeitos Fogo, Pulsando e Piscando valem também para a lanterna, e quem pediu menos movimento no sistema recebe a luz parada.\n\n**A imagem que se mexe anima também na TV e no celular.** GIF, WebP animado e APNG chegam inteiros à mesa, inclusive os que já estavam na campanha. Nas listas, um selo de play marca o que é animado, e passar o mouse anima.",
    "arquivos": [
      {
        "nome": "ato20-0.5.0-1.x86_64.rpm",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.5.0/ato20-0.5.0-1.x86_64.rpm",
        "bytes": 15610629
      },
      {
        "nome": "ato20_0.5.0_amd64.AppImage",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.5.0/ato20_0.5.0_amd64.AppImage",
        "bytes": 103778808
      },
      {
        "nome": "ato20_0.5.0_amd64.deb",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.5.0/ato20_0.5.0_amd64.deb",
        "bytes": 15684972
      },
      {
        "nome": "ato20_0.5.0_x64-setup.exe",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.5.0/ato20_0.5.0_x64-setup.exe",
        "bytes": 10699316
      },
      {
        "nome": "ato20_0.5.0_x64_en-US.msi",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.5.0/ato20_0.5.0_x64_en-US.msi",
        "bytes": 13903944
      }
    ]
  },
  {
    "tag": "v0.4.0",
    "nome": "ATO20 v0.4.0",
    "publicadaEm": "2026-09-28T23:59:15Z",
    "prerelease": false,
    "pagina": "https://github.com/ato20-org/ato20/releases/tag/v0.4.0",
    "notas": "## Novidades\n\n**O personagem ganhou medidores.** Vida, sanidade, munição, carga ou tocha: um número até um teto, com nome, cor e forma de barra, pontos ou porcentagem. Só o mestre escreve, pela ficha, onde a barra se arrasta para mudar o valor. A mesa e o dono do personagem leem, e um medidor escondido não sai do seu computador.\n\n**Os medidores aparecem ao lado do retrato, e podem ir para cima do token.** Na mesa, eles ficam numa coluna junto do retrato. Para o mapa de combate, um interruptor nas Configurações do mapa põe nome e medidores sobre a cabeça dos tokens.\n\n**A campanha ganhou uma janela de configuração.** Pelo menu da campanha. Nela ficam os medidores de fábrica, que todo personagem começa tendo, e o layout e a posição dos retratos, que saíram da janela de Retratos.\n\n**O retrato pode mostrar o nome.** Começa desligado, para não apresentar um PNJ antes da hora. Liga no layout dos retratos, e o nome se arrasta e cresce como as outras peças.\n\n## Correções\n\n**Ao abrir uma campanha, a TV e os celulares não apagam mais os retratos por alguns segundos.**",
    "arquivos": [
      {
        "nome": "ato20-0.4.0-1.x86_64.rpm",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.4.0/ato20-0.4.0-1.x86_64.rpm",
        "bytes": 15549402
      },
      {
        "nome": "ato20_0.4.0_amd64.AppImage",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.4.0/ato20_0.4.0_amd64.AppImage",
        "bytes": 103729656
      },
      {
        "nome": "ato20_0.4.0_amd64.deb",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.4.0/ato20_0.4.0_amd64.deb",
        "bytes": 15623590
      },
      {
        "nome": "ato20_0.4.0_x64-setup.exe",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.4.0/ato20_0.4.0_x64-setup.exe",
        "bytes": 10664436
      },
      {
        "nome": "ato20_0.4.0_x64_en-US.msi",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.4.0/ato20_0.4.0_x64_en-US.msi",
        "bytes": 13867080
      }
    ]
  },
  {
    "tag": "v0.3.0",
    "nome": "ATO20 v0.3.0",
    "publicadaEm": "2026-09-28T23:49:52Z",
    "prerelease": false,
    "pagina": "https://github.com/ato20-org/ato20/releases/tag/v0.3.0",
    "notas": "## Novidades\n\n**O mapa ganha sol e paredes.** O sol não acende nada: ele só diz para onde a sombra cai, e se aponta num céu visto de cima, nas Configurações do mapa. A parede tem altura, então a mureta e a torre jogam sombras diferentes. A sombra do token é a silhueta dele — o cajado, a capa e a montaria aparecem nela. A mesa vê a sombra, mas não as paredes que a fazem.\n\n**O jogador move e gira o token do próprio personagem pelo celular.** Dedo no meio anda com a peça; dedo no anel de fora a gira no lugar.\n\n**A grade virou configuração do mapa, com ímã de encaixe.** Com o ímã ligado, o token pousa no meio da casa, no arrasto do mestre e no dedo do jogador. Segure Alt para soltá-lo onde a mão largou. A casa ocupada por um personagem acende nas três telas.\n\n**Além de mapas, a campanha tem fundos.** Um fundo é a imagem de um cenário com figuras por cima, sem câmera, grade, névoa nem sol. O painel virou Cenas, com uma aba para mapas e outra para fundos.\n\n**A campanha ganhou capa.** É o que a TV mostra quando não há nada no ar. Escolha pelo menu do nome da campanha, que também importa a imagem.\n\n**As ferramentas do mapa ficam expostas na borda direita, e as áreas escondidas viraram um botão no palco.** Ponto, postit e régua de medir sem abrir a bolsa do rodapé; depois de medir, a régua volta para a seleção. As áreas ficam ao lado do índice de pontos, com quantas já foram reveladas.\n\n## Correções\n\n**Criar ou apagar uma cena não apaga mais as pastas e as notas de Arquivos.**\n\n**O botão direito no token mostra as ações dele.** Aparência, Opacidade e o resto sumiam do menu, porque o clique desfazia a seleção.\n\n**A TV e o celular seguem os volumes da mesa de som.** Cada categoria tocava no volume padrão, fosse qual fosse o fader. Se algum estiver baixo, a TV vai soar mais baixa que antes.\n\n**O retrato fica parado na TV e no celular enquanto a câmera anda.**\n\n**O contorno azul deixa de marcar o personagem de um jogador que saiu da mesa.** Ele aparecia como NPC na lista e como jogador no mapa ao mesmo tempo. Uma campanha que já tinha o problema se conserta ao abrir.",
    "arquivos": [
      {
        "nome": "ato20-0.3.0-1.x86_64.rpm",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.3.0/ato20-0.3.0-1.x86_64.rpm",
        "bytes": 15495387
      },
      {
        "nome": "ato20_0.3.0_amd64.AppImage",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.3.0/ato20_0.3.0_amd64.AppImage",
        "bytes": 103688696
      },
      {
        "nome": "ato20_0.3.0_amd64.deb",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.3.0/ato20_0.3.0_amd64.deb",
        "bytes": 15570432
      },
      {
        "nome": "ato20_0.3.0_x64-setup.exe",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.3.0/ato20_0.3.0_x64-setup.exe",
        "bytes": 10615822
      },
      {
        "nome": "ato20_0.3.0_x64_en-US.msi",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.3.0/ato20_0.3.0_x64_en-US.msi",
        "bytes": 13809736
      }
    ]
  },
  {
    "tag": "v0.2.0",
    "nome": "ATO20 v0.2.0",
    "publicadaEm": "2026-09-23T19:36:12Z",
    "prerelease": false,
    "pagina": "https://github.com/ato20-org/ato20/releases/tag/v0.2.0",
    "notas": "## Novidades\n\n**O painel de sons virou uma mesa de som.** Antes era uma trilha por vez. Agora vários sons tocam juntos — a chuva por baixo, a taverna por cima, o trovão disparado na hora —, cada um com a sua barra de volume. O teclado numérico vira os pads: aperte a tecla e o som sai, sem procurar nada na tela. Trocar de ambiente faz fade em vez de cortar.\n\n**Os sons ganharam tipo, nome próprio, busca e macros.** Cada som diz se é ambiente ou disparo, os pads têm cor, e uma macro acende um conjunto inteiro de uma vez. O volume geral saiu de dentro da campanha e virou um botão na barra da janela, onde a mão o acha no meio da sessão.\n\n**A cena lembra que ambiente ela acende.** Abrir a taverna acende o som da taverna.\n\n**Dá para desenhar no mapa, e não só no quadro.** Formas geométricas, setas que curvam e texto solto valem nos dois, com a régua de ferramentas na borda. E você escolhe o que a mesa vê: o desenho pode ficar só para você.\n\n**A área escondida pode ser quadrada, redonda ou desenhada à mão.** Ela também gira, e os vértices se editam depois — a caverna deixa de ser um retângulo em cima de um desenho que não é retangular.\n\n**O token de personagem ganhou um contorno que diz de quem ele é.**\n\n**O personagem pode ter várias aparências.** Além da padrão, quantas você quiser: Ferido, Lobo, Encapuzado. Cada uma guarda o próprio retrato e a própria miniatura, e trocar troca os dois de uma vez — inclusive o token que já está no mapa, em todas as cenas. Dá para trocar pela ficha, pelo menu da lista de personagens ou pelo menu do token.\n\n**Ctrl+V põe imagem de fora no mapa, no quadro e no acervo.** Print de tela, recorte de editor ou imagem copiada do navegador. Com o painel de imagens em foco, a figura só entra no acervo; em qualquer outro lugar, ela também aparece no centro do que você está vendo.\n\n**Os retratos podem andar em grupo.** Uma união com moldura colorida, nome, ordem própria e o canto da tela onde ela fica.\n\n**A ficha em PDF abre dentro do aplicativo**, num leitor próprio, e não numa janela do navegador embutida. O mesmo leitor serve qualquer documento da campanha.\n\n**O item do inventário do jogador ganhou quadro de foto.**\n\n**Criar personagem pede o nome antes, e F2 renomeia.** Desistir no meio não deixa mais um \"Novo personagem\" para trás. A linha ganhou menu no botão direito.\n\n**Renomear ficou previsível em toda a tela.** Clicar fora grava, Enter grava, Escape desiste. Vale para o personagem, a aparência e o grupo de retratos.\n\n**Os painéis vazios explicam o que fazer, e as abas fecham no X** — ou no botão do meio do mouse. Áreas virou uma aba dentro de Mapas.\n\n**O Ctrl+Z ficou mais seguro.** Ele não apaga cena, quadro nem nota — para isso existe a pergunta de confirmação. E dentro de um texto ele desfaz por palavra.\n\n## Correções\n\n**O mapa parava de tremer ao dar zoom, e o gizmo parava de borrar.** Aquele salto para o centro ao aproximar, e as alças que incham quando você afasta o mapa. A roda também ficou mais parecida com a de um mouse de verdade.\n\n**O disparo de som toca o arquivo inteiro, e a trilha reacende sem piscar.**\n\n**A lixeira do acervo passou a ver o som que não está tocando.**\n\n**O X de uma janela que está atrás deixou de pedir dois cliques.**",
    "arquivos": [
      {
        "nome": "ato20-0.2.0-1.x86_64.rpm",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.2.0/ato20-0.2.0-1.x86_64.rpm",
        "bytes": 15468899
      },
      {
        "nome": "ato20_0.2.0_amd64.AppImage",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.2.0/ato20_0.2.0_amd64.AppImage",
        "bytes": 103668216
      },
      {
        "nome": "ato20_0.2.0_amd64.deb",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.2.0/ato20_0.2.0_amd64.deb",
        "bytes": 15543868
      },
      {
        "nome": "ato20_0.2.0_x64-setup.exe",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.2.0/ato20_0.2.0_x64-setup.exe",
        "bytes": 10586613
      },
      {
        "nome": "ato20_0.2.0_x64_en-US.msi",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.2.0/ato20_0.2.0_x64_en-US.msi",
        "bytes": 13756488
      }
    ]
  },
  {
    "tag": "v0.1.4",
    "nome": "ATO20 v0.1.4",
    "publicadaEm": "2026-09-18T18:45:57Z",
    "prerelease": false,
    "pagina": "https://github.com/ato20-org/ato20/releases/tag/v0.1.4",
    "notas": "Uma correção só, e é no Windows.\n\n## Correções\n\n**No Windows, o arquivo do instalador também mostra o ícone do ATO20**\nA 0.1.3 trocou o ícone do aplicativo instalado e do atalho, mas o instalador que você baixa — o `ato20_x64-setup.exe` — continuava aparecendo no Explorer com o ícone genérico da ferramenta que o empacota, um globo azul. Agora é a mesma marca em tudo.\n\n---\n\n**Linux** — `.AppImage` roda sem instalar, e na primeira abertura ele mesmo põe o atalho no menu (rofi, wofi e afins). Basta dar permissão de execução: `chmod +x ato20_*.AppImage`. `.deb` e `.rpm` para quem prefere instalar pelo gerenciador.\n\n**Windows** — `.msi` ou o instalador `.exe`. Os dois saem SEM assinatura de código, então o SmartScreen vai avisar: \"Mais informações\" e \"Executar mesmo assim\".",
    "arquivos": [
      {
        "nome": "ato20-0.1.4-1.x86_64.rpm",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.1.4/ato20-0.1.4-1.x86_64.rpm",
        "bytes": 15351316
      },
      {
        "nome": "ato20_0.1.4_amd64.AppImage",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.1.4/ato20_0.1.4_amd64.AppImage",
        "bytes": 102951416
      },
      {
        "nome": "ato20_0.1.4_amd64.deb",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.1.4/ato20_0.1.4_amd64.deb",
        "bytes": 15426240
      },
      {
        "nome": "ato20_0.1.4_x64-setup.exe",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.1.4/ato20_0.1.4_x64-setup.exe",
        "bytes": 10409277
      },
      {
        "nome": "ato20_0.1.4_x64_en-US.msi",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.1.4/ato20_0.1.4_x64_en-US.msi",
        "bytes": 13649990
      }
    ]
  },
  {
    "tag": "v0.1.3",
    "nome": "ATO20 v0.1.3",
    "publicadaEm": "2026-09-18T18:26:58Z",
    "prerelease": false,
    "pagina": "https://github.com/ato20-org/ato20/releases/tag/v0.1.3",
    "notas": "O ATO20 ganha o próprio ícone. É a única mudança — e ela aparece na barra de tarefas, no atalho e no menu.\n\n## Correções\n\n**O ATO20 passa a ter o próprio ícone na barra de tarefas e no atalho**\nAté aqui todo pacote — AppImage, instalador do Windows, .deb e .rpm — saía com o ícone padrão da ferramenta que empacota o aplicativo, dois anéis ciano e amarelo. Agora é a marca do ATO20: a tenda com o d20, sobre fundo escuro.\n\n---\n\n**Linux** — `.AppImage` roda sem instalar, e na primeira abertura ele mesmo põe o atalho no menu (rofi, wofi e afins). Basta dar permissão de execução: `chmod +x ato20_*.AppImage`. `.deb` e `.rpm` para quem prefere instalar pelo gerenciador.\n\n**Windows** — `.msi` ou o instalador `.exe`. Os dois saem SEM assinatura de código, então o SmartScreen vai avisar: \"Mais informações\" e \"Executar mesmo assim\".",
    "arquivos": [
      {
        "nome": "ato20-0.1.3-1.x86_64.rpm",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.1.3/ato20-0.1.3-1.x86_64.rpm",
        "bytes": 15350661
      },
      {
        "nome": "ato20_0.1.3_amd64.AppImage",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.1.3/ato20_0.1.3_amd64.AppImage",
        "bytes": 102947320
      },
      {
        "nome": "ato20_0.1.3_amd64.deb",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.1.3/ato20_0.1.3_amd64.deb",
        "bytes": 15425232
      },
      {
        "nome": "ato20_0.1.3_x64-setup.exe",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.1.3/ato20_0.1.3_x64-setup.exe",
        "bytes": 10410686
      },
      {
        "nome": "ato20_0.1.3_x64_en-US.msi",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.1.3/ato20_0.1.3_x64_en-US.msi",
        "bytes": 13645894
      }
    ]
  },
  {
    "tag": "v0.1.2",
    "nome": "ATO20 v0.1.2",
    "publicadaEm": "2026-09-18T17:19:42Z",
    "prerelease": false,
    "pagina": "https://github.com/ato20-org/ato20/releases/tag/v0.1.2",
    "notas": "Uma correção de bastidor. Se você usa o AppImage ou o instalador do Windows, ela não muda nada para você.\n\n## Correções\n\n**A página da loja anunciava as novidades da versão anterior**\nDetalhe de bastidor, e só aparece para quem instalar pela loja: o arquivo que descreve o ATO20 para o Flathub ficou uma versão atrás na 0.1.1, então a loja mostrava o que mudou na 0.1.0. Nada muda para quem baixou o AppImage ou o instalador do Windows.\n\n---\n\n**Linux** — `.AppImage` roda sem instalar, e na primeira abertura ele mesmo põe o atalho no menu (rofi, wofi e afins). Basta dar permissão de execução: `chmod +x ato20_*.AppImage`. `.deb` e `.rpm` para quem prefere instalar pelo gerenciador.\n\n**Windows** — `.msi` ou o instalador `.exe`. Os dois saem SEM assinatura de código, então o SmartScreen vai avisar: \"Mais informações\" e \"Executar mesmo assim\".",
    "arquivos": [
      {
        "nome": "ato20-0.1.2-1.x86_64.rpm",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.1.2/ato20-0.1.2-1.x86_64.rpm",
        "bytes": 15358716
      },
      {
        "nome": "ato20_0.1.2_amd64.AppImage",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.1.2/ato20_0.1.2_amd64.AppImage",
        "bytes": 102951416
      },
      {
        "nome": "ato20_0.1.2_amd64.deb",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.1.2/ato20_0.1.2_amd64.deb",
        "bytes": 15433386
      },
      {
        "nome": "ato20_0.1.2_x64-setup.exe",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.1.2/ato20_0.1.2_x64-setup.exe",
        "bytes": 10475134
      },
      {
        "nome": "ato20_0.1.2_x64_en-US.msi",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.1.2/ato20_0.1.2_x64_en-US.msi",
        "bytes": 13662278
      }
    ]
  },
  {
    "tag": "v0.1.1",
    "nome": "ATO20 v0.1.1",
    "publicadaEm": "2026-09-18T16:47:55Z",
    "prerelease": false,
    "pagina": "https://github.com/ato20-org/ato20/releases/tag/v0.1.1",
    "notas": "Uma versão de encanamento. Se você usa o AppImage ou o instalador do Windows, ela não muda nada para você — e é de propósito.\n\n## Novidades\n\n**O ATO20 começa a ser empacotado para as lojas do Linux**\nEsta versão não muda nada no que você já usa — ela existe porque o pacote do Flathub precisa ser construído a partir de uma versão publicada, e não do código do dia. O que mudou por dentro só aparece lá: as fontes deixaram de ser baixadas durante o empacotamento, e o aviso de versão nova some no pacote de loja, onde quem atualiza é a própria loja. Quem baixou o AppImage ou o instalador do Windows continua sendo avisado como antes.\n\n---\n\n**Linux** — `.AppImage` roda sem instalar, e na primeira abertura ele mesmo põe o atalho no menu (rofi, wofi e afins). Basta dar permissão de execução: `chmod +x ato20_*.AppImage`. `.deb` e `.rpm` para quem prefere instalar pelo gerenciador.\n\n**Windows** — `.msi` ou o instalador `.exe`. Os dois saem SEM assinatura de código, então o SmartScreen vai avisar: \"Mais informações\" e \"Executar mesmo assim\".",
    "arquivos": [
      {
        "nome": "ato20-0.1.1-1.x86_64.rpm",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.1.1/ato20-0.1.1-1.x86_64.rpm",
        "bytes": 15359063
      },
      {
        "nome": "ato20_0.1.1_amd64.AppImage",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.1.1/ato20_0.1.1_amd64.AppImage",
        "bytes": 102955512
      },
      {
        "nome": "ato20_0.1.1_amd64.deb",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.1.1/ato20_0.1.1_amd64.deb",
        "bytes": 15434230
      },
      {
        "nome": "ato20_0.1.1_x64-setup.exe",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.1.1/ato20_0.1.1_x64-setup.exe",
        "bytes": 10474614
      },
      {
        "nome": "ato20_0.1.1_x64_en-US.msi",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.1.1/ato20_0.1.1_x64_en-US.msi",
        "bytes": 13666374
      }
    ]
  },
  {
    "tag": "v0.1.0",
    "nome": "ATO20 v0.1.0",
    "publicadaEm": "2026-09-18T12:34:10Z",
    "prerelease": false,
    "pagina": "https://github.com/ato20-org/ato20/releases/tag/v0.1.0",
    "notas": "Primeira beta. Da 0.0.6 para cá são cem commits, e — o que importa mais — **o aplicativo instalado volta a avisar quando sai versão nova**.\n\n## Novidades\n\n**O aplicativo passa a avisar sozinho quando existe versão nova**\nAté aqui toda versão saiu marcada como pré-lançamento, e o endereço que o aplicativo consulta ignora pré-lançamento — quem baixou a 0.0.1 ficou na 0.0.1 sem nunca saber que havia seis versões depois. Desta em diante o aviso chega sozinho.\n\n**A campanha ganha quadros: uma folha sem chão para o mestre pensar**\nO quadro fica na aba ao lado de Cenas, com pastas dentro de pastas. Nele você escreve texto direto na folha, liga as coisas com setas — de ponta solta ou grudada no que você mover — e mistura post-it, imagem, dado e cartão no mesmo lugar. Pôr o quadro no ar mostra a folha inteira na TV e no celular.\n\n**Documento: um cartão de Markdown com prévia ao vivo**\nVocê escreve de um lado e vê formatado do outro. No começo da linha, # dá título, ## subtítulo e - item de lista; @, / e > chamam referência, comando e citação, tanto na nota quanto no cartão.\n\n**A aba Arquivos põe quadros, notas e imagens na mesma árvore de pastas**\nQualquer arquivo entra no acervo agora, e a aba Imagens virou Biblioteca. A nota passou a ser arquivo da campanha: o cartão no quadro só aponta para ela, então a mesma nota pode aparecer em dois quadros sem virar duas cópias. Arrastar a nota da árvore até o quadro funciona como com imagem.\n\n**Ctrl+K abre uma paleta de comandos**\nEla acha janela, cena, livro, imagem e atalho pelo nome, sem você ter de lembrar em que painel aquilo estava.\n\n**Dá para jogar dados por notação, como \"2d6\", sem pegar no saquinho**\n\n**O saquinho ganha o d% de dezenas e a moeda de cara ou coroa**\nO celular do jogador também pede os dois, e a mesa passa a ler \"Coroa\" e \"d%\" em vez de \"2\" e \"d2\".\n\n**A régua virou medidor que fica no mapa, com círculo, cone e retângulo**\nAntes a medida sumia quando você soltava o mouse. Agora ela fica posta na cena, e a forma diz o que você está medindo.\n\n**A estante mostra os livros com capa, em caixa 2.5D, e o clique abre o PDF**\nHá também um comando para abrir o livro no leitor de PDF da máquina. A capa fica guardada depois da primeira vez, então a estante não pisca ao reabrir.\n\n**A cena guarda um handout: imagens do acervo que você manda à mesa uma a uma**\nA bolinha recebe imagens arrastadas e as leva à TV; o que já está na mesa volta para a manga pela mesma bolinha ou pelo menu. O painel ganhou título e uma caixinha de + que escolhe imagens do computador.\n\n**A janela \"Mesa\" mostra o que a TV está vendo, em miniatura, na sua tela**\n\n**Girar pelos cantos do gizmo, como no Figma**\nO botão de rotacionar saiu. A roda do mouse redimensiona a imagem na mão e Shift gira; as setas do teclado andam cinco de cada vez, e com Shift giram a seleção. Segurando a alça da câmera, a roda dá zoom nela.\n\n**Dá para afastar até 50%, com vazio em volta do mapa**\n\n**A cena nasce sem câmera, e a mesa vê tudo até a primeira entrar**\nAntes a cena nova já vinha com um enquadramento que você não escolheu. O botão \"Mesa\" também saiu da barra de cima.\n\n**A lista de personagens separa Players em cima e NPCs embaixo**\n\n**A ficha mostra quem está jogando com ela, e o diálogo do jogador diz há quanto tempo**\nDá para entregar o personagem a outra pessoa dali, e tirar alguém da mesa passa a pedir confirmação. A nota fechada do personagem fica guardada.\n\n**A porta mudou: botões no alto, \"Encontrar campanha\" e o mapa da cena ao fundo do cartão**\nA estante ganhou botão e aceita arquivo solto, \"O que mudou\" virou botão ao lado das Configurações, e a estante vazia virou um alvo tracejado em vez de um espaço em branco.\n\n**Esc larga a ferramenta, e um X na barra faz o mesmo**\n\n**O palco vazio mostra a marca e os atalhos principais**\n\n**A tela diz qual pasta da campanha sumiu, em vez de abrir uma mesa vazia**\n\n## Correções\n\n**Apagar a pasta da campanha com a mesa aberta virava mesa vazia, e a gravação recriava a pasta pela metade**\n\n**No leitor, dar zoom deixava a folha branca por um instante**\nA página que você está lendo passa na frente das vizinhas, e trocar de página depressa não deixa mais um desenho cancelado na tela.\n\n**A máscara escura da câmera cobria o post-it e os controles do mestre**\n\n**O clique fora do mapa tinha deixado de valer**\nA borda saiu e o vazio em volta ganhou pontos.\n\n**O token achatava ao encolher, em vez de parar no piso**\n\n**O d% nascia sem valor, e a soma da mesa dava NaN**\n\n**A ficha só via quem entrou na mesa depois de reabrir o programa**\n\n**O diálogo de Configurações prendia o foco e matava a barra da janela**\n\n**O rótulo da câmera não cabia quando a moldura ficava pequena na tela**\n\n**No quadro, o dado caía puxado para o plano, e não onde a mão soltou**\n\n**No quadro, o texto novo nascia invisível e sem foco**\n\n**A bancada já arrumada não ganhava a aba Quadros ao lado de Cenas**\n\n**O arquivo da extensão se chama manifest.json, e não manifesto.json**\n\n---\n\n**Linux** — `.AppImage` roda sem instalar, e na primeira abertura ele mesmo põe o atalho no menu (rofi, wofi e afins). Basta dar permissão de execução: `chmod +x ato20_*.AppImage`. `.deb` e `.rpm` para quem prefere instalar pelo gerenciador.\n\n**Windows** — `.msi` ou o instalador `.exe`. Os dois saem SEM assinatura de código, então o SmartScreen vai avisar: \"Mais informações\" e \"Executar mesmo assim\".",
    "arquivos": [
      {
        "nome": "ato20-0.1.0-1.x86_64.rpm",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.1.0/ato20-0.1.0-1.x86_64.rpm",
        "bytes": 15371333
      },
      {
        "nome": "ato20_0.1.0_amd64.AppImage",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.1.0/ato20_0.1.0_amd64.AppImage",
        "bytes": 102984184
      },
      {
        "nome": "ato20_0.1.0_amd64.deb",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.1.0/ato20_0.1.0_amd64.deb",
        "bytes": 15446296
      },
      {
        "nome": "ato20_0.1.0_x64-setup.exe",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.1.0/ato20_0.1.0_x64-setup.exe",
        "bytes": 10479069
      },
      {
        "nome": "ato20_0.1.0_x64_en-US.msi",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.1.0/ato20_0.1.0_x64_en-US.msi",
        "bytes": 13680283
      }
    ]
  },
  {
    "tag": "v0.0.6-alpha",
    "nome": "ATO20 v0.0.6 alpha",
    "publicadaEm": "2026-09-16T14:25:26Z",
    "prerelease": true,
    "pagina": "https://github.com/ato20-org/ato20/releases/tag/v0.0.6-alpha",
    "notas": "## Novidades\n\n**A cena tem câmeras com nome, e você escolhe qual delas está no ar**\nCada câmera é um enquadramento guardado do mapa. Elas ficam numa pílula no alto da mesa, e transmitir é escolher uma — a que está no ar aparece marcada, e as outras ficam apagadas no palco, para você ver o que os jogadores não estão vendo. Trocar de câmera corta em fade na TV, e sem nenhuma no ar a mesa fica escura. Segurando V, o mouse vira cinegrafista e move o enquadramento sem mexer no mapa.\n\n**O acervo e a lista \"Em cena\" ganharam pastas**\nPasta dentro de pasta, e arrastar uma pasta para dentro de outra. No acervo, Ctrl e Shift selecionam várias imagens de uma vez. Na lista \"Em cena\", clicar num item do mapa já pega a pasta inteira a que ele pertence.\n\n**Importar arquivo grande não trava mais a janela, e dá para cancelar no meio**\nA cópia saiu da thread da janela: um aviso mostra o que está entrando, quanto falta e um botão de parar. A miniatura de um mapa de 50 megapixels agora sai em menos de um segundo.\n\n**Arquivo largado no painel de imagens entra no acervo**\n\n**A área do mapa cresce com o que você coloca nela**\nAntes o plano tinha um tamanho fixo e o que passava da borda ficava fora do alcance. Agora ele acompanha as peças.\n\n**A barra de ferramentas virou duas bolsas**\nA grade e a régua foram para a bolsa do mapa.\n\n**O que a mesa tirou nas rolagens vira janela da bancada**\n\n**O alfinete alterna a nota do ponto, e a bolinha do saquinho vira X enquanto ele está aberto**\nDois botões que antes só tinham ida: agora clicar de novo desfaz, e o ícone diz em que estado você está.\n\n## Correções\n\n**Trocar o mapa de fundo três vezes seguidas importava o mesmo arquivo três vezes**\nTrês cópias do mesmo mapa pesado dentro da campanha.\n\n**Abrir a tela do espectador no navegador falhava calado**\nEm máquina Linux sem o `xdg-open`, o botão não fazia nada e não dizia por quê.\n\n**Renomear pelo menu não fazia nada, e agora F2 também renomeia**\n\n**O botão de tirar o post-it se escondia, e a prévia não mostrava onde o papel ia cair**\n\n**No celular do jogador, o esmaecido da rolagem comia o texto da ficha**\n\n**A mesa aceitava dado sem fim**\nAgora o teto é cinquenta dados por rolagem.",
    "arquivos": [
      {
        "nome": "ato20-0.0.6-1.x86_64.rpm",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.0.6-alpha/ato20-0.0.6-1.x86_64.rpm",
        "bytes": 15255775
      },
      {
        "nome": "ato20_0.0.6_amd64.AppImage",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.0.6-alpha/ato20_0.0.6_amd64.AppImage",
        "bytes": 102865400
      },
      {
        "nome": "ato20_0.0.6_amd64.deb",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.0.6-alpha/ato20_0.0.6_amd64.deb",
        "bytes": 15328252
      },
      {
        "nome": "ato20_0.0.6_x64-setup.exe",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.0.6-alpha/ato20_0.0.6_x64-setup.exe",
        "bytes": 10374324
      },
      {
        "nome": "ato20_0.0.6_x64_en-US.msi",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.0.6-alpha/ato20_0.0.6_x64_en-US.msi",
        "bytes": 13577883
      }
    ]
  },
  {
    "tag": "v0.0.5-alpha",
    "nome": "ATO20 v0.0.5 alpha",
    "publicadaEm": "2026-09-15T16:27:00Z",
    "prerelease": true,
    "pagina": "https://github.com/ato20-org/ato20/releases/tag/v0.0.5-alpha",
    "notas": "## Novidades\n\n**A lista de novidades cabe numa tela, e cada linha abre quando você quer o detalhe**\nCom treze mudanças, a 0.0.4 virou uma parede de texto na tela de entrada e nas Configurações. Agora os títulos ficam à vista, separados entre o que é novo e o que foi consertado, e o detalhe de cada um abre com um clique. As versões anteriores vêm fechadas, uma linha cada, já dizendo quantas mudanças têm dentro.",
    "arquivos": [
      {
        "nome": "ato20-0.0.5-1.x86_64.rpm",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.0.5-alpha/ato20-0.0.5-1.x86_64.rpm",
        "bytes": 15219336
      },
      {
        "nome": "ato20_0.0.5_amd64.AppImage",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.0.5-alpha/ato20_0.0.5_amd64.AppImage",
        "bytes": 102803960
      },
      {
        "nome": "ato20_0.0.5_amd64.deb",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.0.5-alpha/ato20_0.0.5_amd64.deb",
        "bytes": 15290796
      },
      {
        "nome": "ato20_0.0.5_x64-setup.exe",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.0.5-alpha/ato20_0.0.5_x64-setup.exe",
        "bytes": 10300290
      },
      {
        "nome": "ato20_0.0.5_x64_en-US.msi",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.0.5-alpha/ato20_0.0.5_x64_en-US.msi",
        "bytes": 13541019
      }
    ]
  },
  {
    "tag": "v0.0.4-alpha",
    "nome": "ATO20 v0.0.4 alpha",
    "publicadaEm": "2026-09-15T15:40:55Z",
    "prerelease": true,
    "pagina": "https://github.com/ato20-org/ato20/releases/tag/v0.0.4-alpha",
    "notas": "## Novidades\n\n**Arrastar um personagem, uma imagem ou um item até o mapa mostra onde ele vai cair, e de que tamanho**\nA sombra da peça acompanha o ponteiro, no lugar e no tamanho exatos em que ela vai ficar, e a roda do mouse escolhe o tamanho sem soltar o arrasto — entre um quarto e quatro vezes. Antes a peça só aparecia depois de solta, e cair torta custava dois ajustes com o gizmo.\n\n**Um arquivo arrastado do gerenciador de arquivos cai no mapa onde a mão soltou**\nEle entra no acervo e vai à cena no mesmo gesto, já selecionado. Vários de uma vez entram em escada, para nenhum ficar escondido embaixo do outro. O que não é imagem nem som é recusado.\n\n**O aplicativo diz em que versão está, e o que mudou**\nEsta lista. Ela viaja dentro do pacote, então continua legível na mesa sem Wi-Fi.\n\n**A tela de entrada é uma só, com as novidades num painel ao lado**\nAntes havia duas telas diferentes conforme você já tivesse ou não uma campanha na lista. Agora é a mesma, e o histórico inteiro fica num painel próprio encostado na borda da janela, com rolagem própria.\n\n**As abas e os divisores da bancada ficaram visíveis**\nAs abas passam a ler como aba, coladas no painel que abrem, e cada divisor entre colunas ganhou uma alça que acende quando a mão chega perto — antes era um fio invisível que só se revelava ao ser acertado.\n\n## Correções\n\n**Abrir o aplicativo entrava direto na última campanha**\nA lista de campanhas só aparecia na primeira execução ou depois de fechar a mesa. Quem tem duas campanhas esperava a errada ser lida do disco inteira antes de poder trocar. Recarregar a janela na tela de entrada também caía dentro de uma campanha.\n\n**Trocar de campanha mantinha o elenco da anterior**\nOs personagens da campanha antiga apareciam na nova, e o nome do token vinha errado junto. Só recarregando a janela voltava ao certo.\n\n**O mapa ampliado borrava, espremia e engrossava os controles**\nTrês defeitos do zoom, no mesmo lugar: o mapa e os tokens saíam borrados, passado mais ou menos 400% o mapa encolhia num eixo só e sumia, e o traço dos ícones do gizmo engrossava conforme se ampliava.\n\n**A nota fixada no mapa não arrastava, e o zoom deformava o cartão**\nO cabeçalho do cartão é a alça, e ele não respondia ao arrasto. Junto: clicar no mapa com o cursor dentro do título ou do corpo da nota deixava o campo focado, e o que se digitasse depois — atalho de tecla inclusive — ia para a nota em vez de ir para a mesa.\n\n**Tirar ou trocar o mapa de fundo devolvia o arquivo ao acervo**\nO mapa entrou na campanha para ser o fundo daquela cena. Agora, tirado o fundo, ele sai da campanha em vez de virar mais um arquivo pesado para apagar depois.\n\n**O arquivo recém-importado não chegava a todas as telas**\nAnexar uma miniatura na ficha do personagem não atualizava o acervo, e o botão de pôr o token no mapa ficava desabilitado dizendo “Lendo o acervo” até o aplicativo ser reaberto.\n\n**Rolar a tela de entrada levava a barra de título embora**\nA barra saía por cima e o conteúdo era cortado.\n\n**A tela de carregamento dizia “Abrindo a campanha” sem abrir campanha nenhuma**\nO que ela espera ali é a lista de campanhas da máquina, e ela ainda chegava depois do trabalho já feito.",
    "arquivos": [
      {
        "nome": "ato20-0.0.4-1.x86_64.rpm",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.0.4-alpha/ato20-0.0.4-1.x86_64.rpm",
        "bytes": 15218901
      },
      {
        "nome": "ato20_0.0.4_amd64.AppImage",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.0.4-alpha/ato20_0.0.4_amd64.AppImage",
        "bytes": 102812152
      },
      {
        "nome": "ato20_0.0.4_amd64.deb",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.0.4-alpha/ato20_0.0.4_amd64.deb",
        "bytes": 15289770
      },
      {
        "nome": "ato20_0.0.4_x64-setup.exe",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.0.4-alpha/ato20_0.0.4_x64-setup.exe",
        "bytes": 10309775
      },
      {
        "nome": "ato20_0.0.4_x64_en-US.msi",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.0.4-alpha/ato20_0.0.4_x64_en-US.msi",
        "bytes": 13545115
      }
    ]
  },
  {
    "tag": "v0.0.3-alpha",
    "nome": "ATO20 v0.0.3 alpha",
    "publicadaEm": "2026-09-14T19:13:31Z",
    "prerelease": true,
    "pagina": "https://github.com/ato20-org/ato20/releases/tag/v0.0.3-alpha",
    "notas": "Ainda é alpha: espere coisa quebrada.\n\n**Linux** — `.AppImage` roda sem instalar, e na primeira abertura\nele mesmo põe o atalho no menu (rofi, wofi e afins). Basta dar\npermissão de execução: `chmod +x ato20_*.AppImage`. `.deb` e `.rpm`\npara quem prefere instalar pelo gerenciador.\n**Windows** — `.msi` ou o instalador `.exe`. Os dois saem SEM\nassinatura de código, então o SmartScreen vai avisar: \"Mais\ninformações\" e \"Executar mesmo assim\".",
    "arquivos": [
      {
        "nome": "ato20-0.0.3-1.x86_64.rpm",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.0.3-alpha/ato20-0.0.3-1.x86_64.rpm",
        "bytes": 15275169
      },
      {
        "nome": "ato20_0.0.3_amd64.AppImage",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.0.3-alpha/ato20_0.0.3_amd64.AppImage",
        "bytes": 102861304
      },
      {
        "nome": "ato20_0.0.3_amd64.deb",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.0.3-alpha/ato20_0.0.3_amd64.deb",
        "bytes": 15348876
      },
      {
        "nome": "ato20_0.0.3_x64-setup.exe",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.0.3-alpha/ato20_0.0.3_x64-setup.exe",
        "bytes": 10393708
      },
      {
        "nome": "ato20_0.0.3_x64_en-US.msi",
        "url": "https://github.com/ato20-org/ato20/releases/download/v0.0.3-alpha/ato20_0.0.3_x64_en-US.msi",
        "bytes": 13633479
      }
    ]
  }
];

export const ULTIMA_RELEASE: Release | undefined = RELEASES[0];
