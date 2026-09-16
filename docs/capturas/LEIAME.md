Prints da v0.0.3, usados no README e na landing (`src/components/visoes.tsx`
importa daqui pra não existir uma segunda cópia dos mesmos arquivos):

- `mestre.webp` — a tela do mestre, dentro do aplicativo
- `espectador.webp` — o palco, aberto no navegador, ao lado do Mestre
- `jogador.webp` — o celular do jogador, em pé
- `jogador-saquinho.webp` — o jogador deitado, com o saquinho de dados aberto

Capturados em PNG e convertidos para webp (5,7 MB -> 355 KB), porque o README
carrega todos de uma vez. As duas capturas largas descem para 1600px de largura
no caminho; as do jogador ficam no tamanho nativo.

```sh
magick mestre.png     -resize 1600x -quality 82 -define webp:method=6 mestre.webp
magick espectador.png -resize 1600x -quality 82 -define webp:method=6 espectador.webp
magick jogador-vertical.png   -quality 84 -define webp:method=6 jogador.webp
magick jogador-horizontal.png -quality 84 -define webp:method=6 jogador-saquinho.webp
```
