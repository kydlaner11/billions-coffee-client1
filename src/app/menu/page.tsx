import { generateMetadata } from "@/lib/metadata";
import { MenuSplit } from "@/components/sections/menu-split";

export const metadata = generateMetadata({ title: "Menu", path: "/menu" });

export default function MenuPage() {
  return (
    <main>
      <MenuSplit />
    </main>
  );
}
