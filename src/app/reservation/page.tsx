import { generateMetadata } from "@/lib/metadata";
import { ReservationSplit } from "@/components/sections/reservation-split";

export const metadata = generateMetadata({
  title: "Venue & Event",
  description:
    "Sewa lantai 2 Billions Coffee Madiun dan Tulungagung untuk gathering, ulang tahun, rapat, hingga acara privat lainnya. Suasana nyaman dengan kapasitas yang pas.",
  keywords: [
    "sewa venue Madiun",
    "sewa tempat event Tulungagung",
    "gathering Billions Coffee",
    "venue acara Jawa Timur",
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
