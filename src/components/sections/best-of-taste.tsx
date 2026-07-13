"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import { bestOfTaste } from "@/lib/constants";
import { fadeUp, fadeIn, staggerContainer, viewportOnce } from "@/lib/motion";
import { SwipeHint } from "@/components/ui/swipe-hint";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="mb-12 flex items-center justify-center gap-4"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeIn}
    >
      <span className="h-px w-12 bg-border md:w-20" />
      <h2 className="text-display text-4xl! tracking-[0.2em] text-cream">
        {children}
      </h2>
      <span className="h-px w-12 bg-border md:w-20" />
    </motion.div>
  );
}

export function BestOfTaste() {
  return (
    <section className="mx-auto max-w-350 px-6 pb-16 md:pb-24">
      <SectionHeading>BEST OF TASTE</SectionHeading>

      <motion.div
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scrollbar-none pb-2 [-ms-overflow-style:none] md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer(0.15)}
      >
        {bestOfTaste.map((item, i) => (
          <motion.div
            key={i}
            className="w-full shrink-0 snap-center md:w-auto md:shrink"
            variants={fadeUp}
            whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
          >
            <Link
              href={item.href}
              className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-cream/40"
            >
              {/* Foto */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Deskripsi */}
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="text-2xl">{item.name}</h3>
                <p className="text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 pt-2 text-eyebrow text-cream/80 transition-colors group-hover:text-cream">
                  Lihat Menu
                  <FaArrowRight className="size-2.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
      <SwipeHint />
    </section>
  );
}