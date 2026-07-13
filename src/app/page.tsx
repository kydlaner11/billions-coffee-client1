import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { BestOfTaste } from "@/components/sections/best-of-taste";
import { Locations } from "@/components/sections/locations";
// import { Navbar } from "@/components/layout/navbar";
// import { Footer } from "@/components/layout/footer";
import { Testimonials } from "@/components/sections/testimonials";

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
      {/* <Footer /> */}
    </>
  );
}