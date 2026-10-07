import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // O catálogo de plugins também é lido pelo aplicativo, de dentro da webview
  // (`tauri://localhost`), e sem este cabeçalho a webview recusa a resposta e
  // o `fetch` falha. Só o JSON: é dado público, e as imagens entram por
  // `<img>`, que não pede CORS. Ver `src/lib/catalogo.ts`.
  headers() {
    return [
      {
        source: "/plugins.json",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
    ];
  },
};

export default nextConfig;
