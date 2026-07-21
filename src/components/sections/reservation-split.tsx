"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog } from "@base-ui/react/dialog";
import { AnimatePresence, motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";
import { BookOpen, ChevronLeft, ChevronRight, X } from "lucide-react";
import { locations, eventProofPhotos } from "@/lib/constants";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const heroImage = {
  src: "/locations/madiun-1.jpg",
  alt: "Lantai 2 Billions Coffee untuk event",
};

const venuePhotos = [
  { src: "/eventvanue/event5.jpg", alt: "Dekorasi meja acara di lantai 2 Billions Coffee" },
  { src: "/eventvanue/event6.jpg", alt: "Area buffet lantai 2 Billions Coffee untuk acara" },
];

// Digandakan supaya marquee loop tanpa jeda (seamless).
const marqueePhotos = [...eventProofPhotos, ...eventProofPhotos];

// Kediri tanpa lantai 2 (cuma menu ala carte biasa), Madiun & Tulungagung
// punya lantai 2 yang bisa disewa untuk event.
const branchIds = ["kediri", "madiun", "tulungagung"] as const;
const branches = branchIds
  .map((id) => locations.find((l) => l.id === id))
  .filter((l): l is NonNullable<typeof l> => Boolean(l));

// Kediri tidak punya lantai 2, jadi pesannya cuma soal event/acara secara
// umum — bukan "sewa lantai 2" yang cuma berlaku di Madiun & Tulungagung.
function eventWaMessage(city: string, hasVenueFloor: boolean) {
  return hasVenueFloor
    ? `Halo Billions ${city}, saya ingin tanya-tanya soal sewa lantai 2 untuk event/acara.`
    : `Halo Billions ${city}, saya ingin tanya-tanya soal event/acara.`;
}

// Carousel lightbox untuk menu ala carte Kediri — pakai Dialog primitive yang
// sama dengan sheet navbar (fokus-trap, Escape, klik-luar-close sudah gratis).
function MenuCarouselModal({
  open,
  onOpenChange,
  photos,
  city,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  photos: readonly { src: string; alt: string }[];
  city: string;
}) {
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setIndex((i) => (i + 1) % photos.length);

  // Trigger-nya sudah disembunyikan kalau cabang belum punya foto menu, tapi
  // Dialog.Popup tetap dirender di tree (cuma disembunyikan via CSS saat
  // closed) — tanpa guard ini, photos[index].src bisa crash saat prerender.
  if (photos.length === 0) return null;

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        onOpenChange(isOpen);
        if (!isOpen) setIndex(0);
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-100 bg-background/90 backdrop-blur-xs transition-opacity data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed inset-0 z-100 flex items-center justify-center p-4 transition-opacity data-ending-style:opacity-0 data-starting-style:opacity-0">
          <Dialog.Title className="sr-only">
            Menu Ala Carte Billions {city}
          </Dialog.Title>
          <div className="relative flex w-full max-w-100 flex-col items-center gap-4">
            <Dialog.Close
              aria-label="Tutup"
              className="absolute -top-11 right-0 text-subtle transition-colors hover:text-cream"
            >
              <X className="size-6" />
            </Dialog.Close>

            <div className="relative aspect-3/4 w-full overflow-hidden rounded-lg border border-border bg-surface">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={photos[index].src}
                    alt={photos[index].alt}
                    fill
                    sizes="(max-width: 768px) 90vw, 400px"
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={prev}
                aria-label="Halaman sebelumnya"
                className="rounded-md border border-border p-2 text-subtle transition-colors hover:border-cream/40 hover:text-cream"
              >
                <ChevronLeft className="size-4" />
              </button>
              <span className="text-eyebrow text-subtle">
                {index + 1} / {photos.length}
              </span>
              <button
                type="button"
                onClick={next}
                aria-label="Halaman berikutnya"
                className="rounded-md border border-border p-2 text-subtle transition-colors hover:border-cream/40 hover:text-cream"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function ReservationSplit() {
  const [active, setActive] = useState(1); // default: Madiun (index 0 = Kediri)
  const [menuOpen, setMenuOpen] = useState(false);
  const loc = branches[active];
  const waLink = loc
    ? `https://wa.me/${loc.waNumber}?text=${encodeURIComponent(
        eventWaMessage(loc.city, loc.id !== "kediri")
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

        {/* Foto venue */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
        >
          <motion.p className="text-eyebrow text-subtle" variants={fadeUp}>
            Venue
          </motion.p>
          <motion.div
            className="mt-4 grid grid-cols-2 gap-3"
            variants={staggerContainer(0.08)}
          >
            {venuePhotos.map((photo) => (
              <motion.div
                key={photo.src}
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

        {/* Event proof — intro teks */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.12)}
        >
          <motion.p className="text-eyebrow text-subtle" variants={fadeUp}>
            Event Proof
          </motion.p>
          <motion.h2
            className="text-display mt-2 text-2xl text-cream md:text-3xl"
            variants={fadeUp}
          >
            Momen Billions
          </motion.h2>
          <motion.p
            className="mt-4 max-w-prose text-sm leading-relaxed text-muted"
            variants={fadeUp}
          >
            Dari kompetisi masak, kolaborasi brand, hingga gathering
            komunitas — beberapa dokumentasi acara yang sudah berlangsung di
            Billions Coffee.
          </motion.p>
        </motion.div>

        {/* Event proof — galeri marquee looping */}
        <div className="relative -mx-8 overflow-hidden md:-mx-12">
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
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r from-background to-transparent md:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-background to-transparent md:w-16" />
        </div>

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
            className="mt-4 grid grid-cols-3 gap-3"
            variants={staggerContainer(0.1)}
          >
            {branches.map((item, i) => {
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
                    sizes="(max-width: 1024px) 33vw, 16vw"
                    className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                      isActive ? "" : "opacity-70"
                    }`}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
                  {item.id === "kediri" && (
                    <span className="absolute top-2 left-2 rounded-full bg-cream/90 px-1.5 py-0.5 text-[0.55rem] font-medium whitespace-nowrap uppercase tracking-wide text-[#0a0908]">
                      Ala Carte Only
                    </span>
                  )}
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
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md bg-cream px-4 py-2.5 text-eyebrow text-[0.7rem]! text-[#0a0908]! transition-opacity hover:opacity-90"
                    >
                      <FaWhatsapp className="size-4" />
                      Tanya via WhatsApp
                    </a>
                    {loc.menuPhotos.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setMenuOpen(true)}
                        className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-eyebrow text-[0.7rem]! text-foreground transition-colors hover:border-cream/40 hover:text-cream"
                      >
                        <BookOpen className="size-4" />
                        Lihat Menu
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <MenuCarouselModal
        open={menuOpen}
        onOpenChange={setMenuOpen}
        photos={loc?.menuPhotos ?? []}
        city={loc?.city ?? ""}
      />
    </section>
  );
}
