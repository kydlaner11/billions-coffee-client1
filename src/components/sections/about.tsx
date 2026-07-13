"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { aboutContent, awards } from "@/lib/constants";
import {
  fadeUp,
  scaleIn,
  staggerContainer,
  viewportOnce,
} from "@/lib/motion";


function Stars() {
  return (
    <div className="flex justify-center gap-1" aria-label="5 dari 5 bintang">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="size-3.5 fill-cream"
          aria-hidden="true"
        >
          <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export function About() {
  return (
    <section className="mx-auto max-w-350 px-2 py-16 md:py-24">
      <motion.div
        className="grid gap-6 md:grid-cols-2 md:gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer(0.2)}
      >
        {/* Kiri: teks dalam kartu bordered */}
        <motion.div
          className="flex flex-col rounded-lg border border-border bg-surface p-8 md:p-12"
          variants={fadeUp}
        >
          <h2 className="text-display text-4xl! tracking-[0.2em] text-cream">
            {aboutContent.eyebrow}
          </h2>

          {/* Gap vertikal disengaja seperti desain */}
          <p className="mt-auto max-w-md pt-16 text-sm uppercase leading-relaxed tracking-wide text-muted md:pt-24">
            {aboutContent.body}
          </p>
        </motion.div>

        {/* Kanan: foto interior */}
        <motion.div
          className="relative min-h-70 overflow-hidden rounded-lg border border-border md:min-h-105"
          variants={scaleIn}
        >
          <Image
            src={aboutContent.image}
            alt={aboutContent.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>
      <motion.div
        className="mt-4 grid gap-6 md:grid-cols-3 md:gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer(0.12)}
      >
        {awards.map((award) => (
          <motion.div
            key={award.title}
            className="flex flex-col items-center gap-3 rounded-lg border border-border bg-surface px-6 py-10 text-center"
            variants={fadeUp}
            whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
          >
            <Stars />
            <h3 className="text-2xl">{award.title}</h3>
            <p className="text-eyebrow leading-relaxed text-subtle">
              {award.subtitle}
              <br />
              {award.location}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}