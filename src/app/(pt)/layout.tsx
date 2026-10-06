import { Raiz } from "@/components/raiz";

/** O root layout do português, na raiz do domínio. */
export default function LayoutPt({ children }: LayoutProps<"/">) {
  return <Raiz idioma="pt">{children}</Raiz>;
}
