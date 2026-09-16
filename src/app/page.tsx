import { Cortinas } from "@/components/cortinas";
import { Fechamento } from "@/components/fechamento";
import { Fluxo } from "@/components/fluxo";
import { Hero } from "@/components/hero";
import { Mesa } from "@/components/mesa";
import { Visoes } from "@/components/visoes";

export default function Home() {
  return (
    <>
      <Cortinas />
      <main className="min-h-dvh">
        <Hero />
        <Fluxo />
        <Visoes />
        <Mesa />
        <Fechamento />
      </main>
    </>
  );
}
