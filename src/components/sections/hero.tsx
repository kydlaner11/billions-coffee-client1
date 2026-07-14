"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { heroSlides, heroContent } from "@/lib/constants";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function Hero() {
  // Slide dengan primary:true tampil duluan (LCP), sisanya menyusul.
  const slides = useMemo(() => {
    const arr = [...heroSlides];
    arr.sort((a, b) => Number(b.primary) - Number(a.primary));
    return arr;
  }, []);

  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % slides.length),
      heroContent.intervalMs
    );
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section className="relative h-svh min-h-150 w-full overflow-hidden">
      {/* Layer foto (fade silang + ken burns halus) */}
      {slides.map((slide, i) => {
        const isActive = i === active;
        return (
          <motion.div
            key={slide.src}
            className="absolute inset-0"
            animate={{
              opacity: isActive ? 1 : 0,
              scale: isActive ? 1.08 : 1,
            }}
            transition={{
              opacity: { duration: 1.5, ease: "easeInOut" },
              scale: isActive
                ? {
                    duration: heroContent.intervalMs / 1000 + 1.5,
                    ease: "linear",
                  }
                : { duration: 1.5, ease: "easeInOut" },
            }}
            aria-hidden={isActive ? undefined : true}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        );
      })}

      {/* Overlay gelap agar teks terbaca */}
      <div className="absolute inset-0 bg-linear-to-b from-background/40 via-background/20 to-background/90" />
      <div className="absolute inset-0 bg-background/20" />

      {/* Konten */}
      <div className="relative z-10 flex h-full items-end">
        <div className="mx-auto w-full max-w-350 px-2 pb-20 md:pb-28">
          <motion.h1
            className="text-display text-7xl leading-[0.95] text-cream"
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.15, 0.2)}
          >
            {heroContent.title.map((line) => (
              <motion.span key={line} className="block" variants={fadeUp}>
                {line}
              </motion.span>
            ))}
          </motion.h1>
        </div>
      </div>
    </section>
  );
}