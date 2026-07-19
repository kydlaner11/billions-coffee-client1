import { generateMetadata } from "@/lib/metadata";
import { MenuSplit } from "@/components/sections/menu-split";

export const metadata = generateMetadata({
  title: "Menu",
  description:
    "Jelajahi menu Billions Coffee: signature coffee, iced & blended drinks, tenderloin steak, hingga sweet finish. Tersedia di cabang Kediri, Tulungagung, dan Madiun.",
  keywords: ["menu Billions Coffee", "menu kopi Kediri", "menu cafe Tulungagung", "steak Madiun"],
  path: "/menu",
});

export default function MenuPage() {
  return (
    <main>
      <MenuSplit />
    </main>
  );
}
