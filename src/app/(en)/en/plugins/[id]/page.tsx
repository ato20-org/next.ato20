import { metadadosDoPlugin, PaginaDoPlugin, paramsDosPlugins } from "@/components/pagina-do-plugin";

// O README vem do repositório do plugin: a página se refaz a cada hora, e
// imagem nova no README chega aqui sem deploy do site. Ver `lerReadme`.
export const revalidate = 3600;
export const dynamicParams = false;

export const generateStaticParams = paramsDosPlugins;

export async function generateMetadata({ params }: PageProps<"/en/plugins/[id]">) {
  return metadadosDoPlugin("en", (await params).id);
}

export default async function PluginEn({ params }: PageProps<"/en/plugins/[id]">) {
  return <PaginaDoPlugin idioma="en" id={(await params).id} />;
}
