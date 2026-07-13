"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";
import { locations } from "@/lib/constants";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const heroImage = {
  src: "/locations/madiun-1.jpg",
  alt: "Lantai 2 Billions Coffee untuk event",
};

const eventPhotos = [
  { src: "/locations/madiun.jpg", alt: "Dokumentasi lantai 2 Billions Madiun" },
  { src: "/locations/madiun-1.jpg", alt: "Dokumentasi lantai 2 Billions Madiun" },
  {
    src: "/locations/tulungagung.jpg",
    alt: "Dokumentasi lantai 2 Billions Tulungagung",
  },
  {
    src: "/locations/tulungagung-1.jpg",
    alt: "Dokumentasi lantai 2 Billions Tulungagung",
  },
];

// Hanya cabang dengan lantai 2 yang bisa disewa untuk event.
const venueBranchIds = ["madiun", "tulungagung"] as const;
const venueLocations = venueBranchIds
  .map((id) => locations.find((l) => l.id === id))
  .filter((l): l is NonNullable<typeof l> => Boolean(l));

function eventWaMessage(city: string) {
  return `Halo Billions ${city}, saya ingin tanya-tanya soal sewa lantai 2 untuk event/acara.`;
}

export function ReservationSplit() {
  const [active, setActive] = useState(0);
  const loc = venueLocations[active];
  const waLink = loc
    ? `https://wa.me/${loc.waNumber}?text=${encodeURIComponent(
        eventWaMessage(loc.city)
      )}`
    : "#";

  return (
    <section className="lg:grid lg:grid-cols-2">
      {/* Kiri: foto + judul, sticky mengikuti scroll di desktop */}
      <div className="relative h-100 overflow-hidden md:h-125 lg:sticky lg:top-0 lg:h-svh">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
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
          <motion.h1 className="text-display text-6xl leading-[0.95] text-cream md:text-7xl">
            {["BOOK", "FOR EVENT"].map((line) => (
              <motion.span key={line} className="block" variants={fadeUp}>
                {line}
              </motion.span>
            ))}
          </motion.h1>
        </motion.div>
      </div>

      {/* Kanan: penjelasan sewa lantai 2 + proof event + pilih cabang */}
      <div className="flex flex-col gap-10 border-t border-border p-8 md:p-12 lg:border-t-0 lg:border-l lg:border-border">
        {/* Penjelasan */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.12)}
        >
          <motion.p className="text-eyebrow text-subtle" variants={fadeUp}>
            Venue &amp; Event
          </motion.p>
          <motion.h2
            className="text-display mt-2 text-3xl text-cream md:text-4xl"
            variants={fadeUp}
          >
            Lantai 2, Ruang Personal untuk Acara Anda
          </motion.h2>
          <motion.p
            className="mt-4 max-w-prose text-sm leading-relaxed text-muted"
            variants={fadeUp}
          >
            Lantai 2 Billions Coffee cabang Madiun dan Tulungagung tersedia
            untuk disewa berbagai acara — gathering komunitas, ulang tahun,
            rapat kecil, hingga acara privat lainnya. Suasana nyaman dengan
            kapasitas yang pas untuk kumpul bersama.
          </motion.p>
        </motion.div>

        {/* Proof event */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
        >
          <motion.p className="text-eyebrow text-subtle" variants={fadeUp}>
            Proof Event
          </motion.p>
          <motion.div
            className="mt-4 grid grid-cols-2 gap-3"
            variants={staggerContainer(0.08)}
          >
            {eventPhotos.map((photo, i) => (
              <motion.div
                key={`${photo.src}-${i}`}
                variants={fadeUp}
                className="relative aspect-square overflow-hidden rounded-lg border border-border"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Pilih cabang */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.12)}
        >
          <motion.p className="text-eyebrow text-subtle" variants={fadeUp}>
            Pilih Cabang
          </motion.p>
          <motion.div
            className="mt-4 grid grid-cols-2 gap-3"
            variants={staggerContainer(0.1)}
          >
            {venueLocations.map((item, i) => {
              const isActive = i === active;
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  variants={fadeUp}
                  whileHover={{
                    y: -4,
                    transition: { duration: 0.25, ease: "easeOut" },
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`group relative aspect-4/3 overflow-hidden rounded-lg border text-left transition-colors ${
                    isActive
                      ? "border-cream/60 ring-1 ring-cream/30"
                      : "border-border hover:border-cream/30"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={`Billions ${item.city}`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                      isActive ? "" : "opacity-70"
                    }`}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-eyebrow text-sm! text-cream">
                    {item.city}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Kontak cabang aktif */}
          <div className="mt-4 rounded-lg border border-border bg-surface p-6">
            <AnimatePresence mode="wait">
              {loc && (
                <motion.div
                  key={loc.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <h3 className="text-xl text-cream">Billions {loc.city}</h3>
                  <p className="mt-1 text-sm text-muted">{loc.address}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <a
                      href={`tel:${loc.phone}`}
                      className="text-sm text-muted transition-colors hover:text-cream"
                    >
                      {loc.phoneDisplay}
                    </a>
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md bg-cream px-4 py-2.5 text-eyebrow text-[0.7rem]! text-[#0a0908] transition-opacity hover:opacity-90"
                    >
                      <FaWhatsapp className="size-4" />
                      Tanya via WhatsApp
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
