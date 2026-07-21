"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { MenuFlipbook } from "@/components/sections/menu-flipbook";

const menuHeroImage = {
  src: "/menu/pic-2.png",
  alt: "Sajian andalan Billions Coffee",
};

export function MenuSplit() {
  return (
    // Terkunci ke tinggi viewport (h-dvh) + overflow-hidden di mobile supaya
    // gesture drag-flip tidak "berebut" dengan scroll halaman — sebelumnya ada
    // ruang lebih di bawah yang bisa ke-scroll saat sedang flip. Kembali ke
    // alur normal (scroll biasa / sticky split) mulai md:.
    <section className="flex h-dvh flex-col overflow-hidden md:h-auto md:overflow-visible lg:grid lg:grid-cols-2">
      {/* Kiri: foto + judul, sticky mengikuti scroll di desktop */}
      <div className="relative h-44 shrink-0 overflow-hidden sm:h-48 md:h-125 md:shrink lg:sticky lg:top-0 lg:h-svh">
        <Image
          src={menuHeroImage.src}
          alt={menuHeroImage.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/40 via-background/10 to-background/90" />

        <motion.div
          className="relative z-10 flex h-full items-end p-4 md:p-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.15, 0.2)}
        >
          <motion.h1
            className="text-display text-4xl leading-[0.95] text-cream md:text-7xl"
            variants={fadeUp}
          >
            MENU
          </motion.h1>
        </motion.div>
      </div>

      {/* Kanan: flip-book menu interaktif */}
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 overflow-hidden border-t border-border p-3 text-center md:min-h-125 md:flex-none md:gap-6 md:p-10 lg:min-h-svh lg:border-t-0 lg:border-l lg:border-border">
        <motion.div
          className="flex min-h-0 w-full flex-1 flex-col items-center gap-3 md:flex-none md:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.12)}
        >
          <motion.p className="text-eyebrow shrink-0 text-subtle" variants={fadeUp}>
            Flip Menu
          </motion.p>
          <motion.div className="min-h-0 w-full flex-1 md:flex-none" variants={fadeUp}>
            <MenuFlipbook />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
