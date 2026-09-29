import { Cortinas } from "@/components/cortinas";
import { Enquadramento } from "@/components/enquadramento";
import { Fechamento } from "@/components/fechamento";
import { Fluxo } from "@/components/fluxo";
import { Hero } from "@/components/hero";
import { Historia } from "@/components/historia";
import { Mesa } from "@/components/mesa";
import { Plugins } from "@/components/plugins";
import { Precisa } from "@/components/precisa";
import { Visoes } from "@/components/visoes";

export default function Home() {
  return (
    <>
      <Cortinas />
      <main className="min-h-dvh">
        <Hero />
        <Enquadramento />
        <Historia />
        <Plugins />
        <Fluxo />
        <Visoes />
        <Precisa />
        <Mesa />
        <Fechamento />
      </main>
    </>
  );
}
