import { generateMetadata } from "@/lib/metadata";
import { ReservationSplit } from "@/components/sections/reservation-split";

export const metadata = generateMetadata({
  title: "Venue & Event",
  path: "/reservation",
});

export default function ReservationPage() {
  return (
    <main>
      <ReservationSplit />
    </main>
  );
}
