import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { BestOfTaste } from "@/components/sections/best-of-taste";
import { Locations } from "@/components/sections/locations";
// import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Testimonials } from "@/components/sections/testimonials";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: "Coffee Shop & Tempat Nongkrong Estetik di Jatim", 
  // Hasil: "Coffee Shop & Tempat Nongkrong Estetik di Jatim | Billions Coffee"
  description:
    "Cari coffee shop terdekat? Billions Coffee adalah rekomendasi tempat ngopi & resto estetik di Madiun, Tulungagung, dan Kediri. Nyaman untuk nongkrong & acara!",
  keywords: [
    "Billions Coffee",
    "coffee shop terdekat",
    "tempat ngopi terdekat",
    "cafe terdekat dari lokasi saya",
    "tempat nongkrong estetik",
    "rekomendasi cafe madiun",
    "resto tulungagung",
    "tempat ngopi di madiun",
    "cafe di tulungagung kota"
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