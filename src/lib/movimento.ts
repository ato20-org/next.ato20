import { useSyncExternalStore } from "react";

const CONSULTA = "(prefers-reduced-motion: reduce)";

function assinar(aviso: () => void) {
  const lista = window.matchMedia(CONSULTA);
  lista.addEventListener("change", aviso);
  return () => lista.removeEventListener("change", aviso);
}

const ler = () => window.matchMedia(CONSULTA).matches;
// No servidor não há preferência a ler. `false` é o HTML de quem aceita
// movimento, e o que mudar para quem pediu menos entra na hidratação — nada
// anima antes disso, então ninguém vê o movimento que recusou.
const lerNoServidor = () => false;

/**
 * Se a pessoa pediu menos movimento no sistema.
 *
 * Leitura de ambiente, e não estado: por isso `useSyncExternalStore`, que
 * acompanha a troca da preferência com a página aberta, e não `useEffect` +
 * `setState`, que desenharia uma vez errado antes de corrigir.
 */
export function useMenosMovimento() {
  return useSyncExternalStore(assinar, ler, lerNoServidor);
}
