"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import { aboutContent, eventProofPhotos } from "@/lib/constants";
import {
  fadeUp,
  scaleIn,
  staggerContainer,
  viewportOnce,
} from "@/lib/motion";

// Digandakan supaya marquee loop tanpa jeda (seamless).
const marqueePhotos = [...eventProofPhotos, ...eventProofPhotos];


// Dipakai oleh grid Awards yang saat ini di-comment di bawah.
// function Stars() {
//   return (
//     <div className="flex justify-center gap-1" aria-label="5 dari 5 bintang">
//       {Array.from({ length: 5 }).map((_, i) => (
//         <svg
//           key={i}
//           viewBox="0 0 24 24"
//           className="size-3.5 fill-cream"
//           aria-hidden="true"
//         >
//           <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2z" />
//         </svg>
//       ))}
//     </div>
//   );
// }

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
          <p className="mt-auto max-w-md whitespace-pre-line pt-16 text-sm leading-relaxed text-muted md:pt-24">
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
      {/* <motion.div
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
      </motion.div> */}

      {/* Event proof — marquee looping, nuansa kartu sama seperti card About */}
      <motion.div
        className="mt-4 flex flex-col items-center gap-6 rounded-lg border border-border bg-surface p-8 text-center md:p-12"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer(0.12)}
      >
        <motion.div variants={fadeUp}>
          <p className="text-eyebrow text-subtle">Event Proof</p>
          <h3 className="text-display mt-2 text-2xl text-cream md:text-3xl">
            Momen Spesial di Billions Coffee
          </h3>
          <p className="mx-auto mt-4 max-w-prose text-sm leading-relaxed text-muted">
            Dari kompetisi masak, kolaborasi brand, hingga gathering
            komunitas — lantai 2 Billions Coffee siap jadi tempat acara
            Anda berikutnya.
          </p>
        </motion.div>

        <motion.div
          className="relative -mx-8 w-[calc(100%+4rem)] overflow-hidden md:-mx-12 md:w-[calc(100%+6rem)]"
          variants={fadeUp}
        >
          <motion.div
            className="flex w-max gap-4 px-8 md:px-12"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: eventProofPhotos.length * 4,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {marqueePhotos.map((photo, i) => (
              <div
                key={`${photo.src}-${i}`}
                className="relative aspect-4/3 w-56 shrink-0 overflow-hidden rounded-lg border border-border sm:w-64"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="256px"
                  className="object-cover"
                />
              </div>
            ))}
          </motion.div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r from-surface to-transparent md:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-surface to-transparent md:w-16" />
        </motion.div>

        <motion.div variants={fadeUp}>
          <Link
            href="/reservation"
            className="inline-flex items-center gap-2 rounded-md bg-cream px-6 py-3 text-eyebrow text-[0.7rem]! text-[#0a0908]! transition-opacity hover:opacity-90"
          >
            Sewa Venue &amp; Event
            <FaArrowRight className="size-2.5" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}