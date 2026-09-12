import { generateMetadata } from "@/lib/metadata";
import { ReservationSplit } from "@/components/sections/reservation-split";

export const metadata = generateMetadata({
  title: "Sewa Tempat Event, Meeting & Gathering", 
  // Hasil render: "Sewa Tempat Event, Meeting & Gathering | Billions Coffee"
  description:
    "Cari tempat untuk acara privat? Sewa lantai 2 Billions Coffee Madiun & Tulungagung untuk gathering, meeting, hingga ulang tahun. Suasana estetik & nyaman. Cek info reservasi!",
  keywords: [
    "sewa venue Madiun",
    "sewa tempat event Tulungagung",
    "tempat meeting di Madiun",
    "cafe untuk ulang tahun Tulungagung",
    "tempat gathering Madiun",
    "private area cafe Tulungagung",
    "reservasi Billions Coffee",
    "cafe madiun estetik", // Mengambil data dari GSC sebelumnya
    "resto tulungagung" // Mengambil data dari GSC sebelumnya
  ],
  path: "/reservation",
});

export default function ReservationPage() {
  return (
    <main>
      <ReservationSplit />
    </main>
  );
}
