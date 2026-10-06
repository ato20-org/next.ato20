import { PaginaDeReleases, metadadosDeReleases } from "@/components/pagina-de-releases";

export const metadata = metadadosDeReleases("pt");

export default function Releases() {
  return <PaginaDeReleases idioma="pt" />;
}
