import { Cortinas } from "@/components/cortinas";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <>
      <Cortinas />
      <main className="min-h-dvh">
        <Hero />
      </main>
    </>
  );
}
