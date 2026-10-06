import { Raiz } from "@/components/raiz";

/** O root layout do inglês, em `/en`. */
export default function LayoutEn({ children }: LayoutProps<"/">) {
  return <Raiz idioma="en">{children}</Raiz>;
}
