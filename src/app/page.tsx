import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { BestOfTaste } from "@/components/sections/best-of-taste";
import { Locations } from "@/components/sections/locations";
// import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Testimonials } from "@/components/sections/testimonials";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata({
  description:
    "Billions Coffee — kedai kopi & resto premium di Kediri, Tulungagung, dan Madiun. Signature coffee, steak, dan menu andalan dengan suasana nyaman untuk nongkrong hingga acara.",
  keywords: [
    "Billions Coffee",
    "kedai kopi Kediri",
    "coffee shop Tulungagung",
    "cafe Madiun",
    "tempat nongkrong Jawa Timur",
  ],
  path: "/",
});

export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <main>
        <Hero />
        <About />
        <BestOfTaste />
        <Testimonials />
        <Locations />
      </main>
      <Footer />
    </>
  );
}