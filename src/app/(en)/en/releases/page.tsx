import { PaginaDeReleases, metadadosDeReleases } from "@/components/pagina-de-releases";

export const metadata = metadadosDeReleases("en");

export default function ReleasesEn() {
  return <PaginaDeReleases idioma="en" />;
}
