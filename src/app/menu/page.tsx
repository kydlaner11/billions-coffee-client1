import { generateMetadata } from "@/lib/metadata";
import { MenuSplit } from "@/components/sections/menu-split";

export const metadata = generateMetadata({
  title: "Daftar Menu & Harga Promo Terbaru", 
  // Hasil: "Daftar Menu & Harga Promo Terbaru | Billions Coffee"
  description:
    "Lihat daftar menu Billions Coffee Kediri, Tulungagung, dan Madiun. Nikmati signature coffee, makanan resto lezat, dengan harga yang terjangkau. Cek menunya di sini!",
  keywords: [
    "billions tulungagung menu",
    "menu billions cafe kediri",
    "harga menu billions coffee",
    "cafe murah madiun",
    "cafe murah tulungagung",
    "resto tulungagung",
    "makanan enak di madiun"
  ],
  path: "/menu",
});

export default function MenuPage() {
  return (
    <main>
      <MenuSplit />
    </main>
  );
}
