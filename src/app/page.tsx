import { Cortinas } from "@/components/cortinas";
import { Hero } from "@/components/hero";
import { Mesa } from "@/components/mesa";

export default function Home() {
  return (
    <>
      <Cortinas />
      <main className="min-h-dvh">
        <Hero />
        <Mesa />
      </main>
    </>
  );
}
