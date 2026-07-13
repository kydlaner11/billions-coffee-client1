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
    <section className="lg:grid lg:grid-cols-2">
      {/* Kiri: foto + judul, sticky mengikuti scroll di desktop */}
      <div className="relative h-100 overflow-hidden md:h-125 lg:sticky lg:top-0 lg:h-svh">
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
          className="relative z-10 flex h-full items-end p-6 md:p-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.15, 0.2)}
        >
          <motion.h1
            className="text-display text-7xl leading-[0.95] text-cream"
            variants={fadeUp}
          >
            MENU
          </motion.h1>
        </motion.div>
      </div>

      {/* Kanan: flip-book menu interaktif */}
      <div className="flex min-h-100 flex-col items-center justify-center gap-6 border-t border-border p-10 text-center md:min-h-125 lg:min-h-svh lg:border-t-0 lg:border-l lg:border-border">
        <motion.div
          className="flex w-full flex-col items-center gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.12)}
        >
          <motion.p className="text-eyebrow text-subtle" variants={fadeUp}>
            Flip Menu
          </motion.p>
          <motion.div className="w-full" variants={fadeUp}>
            <MenuFlipbook />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
