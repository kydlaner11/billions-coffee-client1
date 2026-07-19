"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FaWhatsapp, FaArrowRight } from "react-icons/fa6";
import { SiGojek, SiGrab } from "react-icons/si";
import { locations } from "@/lib/constants";
import { fadeUp, fadeIn, staggerContainer, viewportOnce } from "@/lib/motion";
import { SwipeHint } from "@/components/ui/swipe-hint";
import { SocialIcons } from "@/components/layout/social-icons";
import { cafeSchema } from "@/lib/schema";

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

export function Locations() {
  const [active, setActive] = useState(0);
  const loc = locations[active];

  const waLink = `https://wa.me/${loc.waNumber}?text=${encodeURIComponent(
    loc.waMsg
  )}`;
  const mapEmbed = `https://maps.google.com/maps?q=${loc.mapsQuery}&output=embed`;

  return (
    <section id="locations" className="mx-auto max-w-350 px-2 pb-16 md:pb-24">
      {locations.map((item) => (
        <script
          key={item.id}
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(cafeSchema(item)) }}
        />
      ))}
      <SectionHeading>BILLIONS LOCATIONS</SectionHeading>

      {/* Kartu foto cabang — slide horizontal di mobile, grid di desktop */}
      <motion.div
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scrollbar-none pb-2 [-ms-overflow-style:none] md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer(0.12)}
      >
        {locations.map((item, i) => {
          const isActive = i === active;
          return (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={isActive}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
              whileTap={{ scale: 0.98 }}
              className={`group relative aspect-4/3 w-64 shrink-0 snap-start overflow-hidden rounded-lg border text-left transition-colors md:w-auto md:shrink ${
                isActive
                  ? "border-cream/60 ring-1 ring-cream/30"
                  : "border-border hover:border-cream/30"
              }`}
            >
              <Image
                src={item.image}
                alt={`Billions ${item.city}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                  isActive ? "" : "opacity-70"
                }`}
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
              <span className="absolute bottom-4 left-4 text-eyebrow text-sm! text-cream">
                {item.city}
              </span>
            </motion.button>
          );
        })}
      </motion.div>
      <SwipeHint />

      {/* Panel maps + kontak (berubah sesuai cabang aktif) */}
      <div className="mt-4 grid gap-6 md:grid-cols-2 md:gap-4">
        {/* Maps */}
        <div className="relative min-h-80 overflow-hidden rounded-lg border border-border md:min-h-105">
          <AnimatePresence mode="wait">
            <motion.div
              key={loc.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <iframe
                title={`Peta Billions ${loc.city}`}
                src={mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full grayscale-[0.3]"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Kontak */}
        <div className="flex flex-col rounded-lg border border-border bg-surface p-8 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex flex-col"
            >
              <h3 className="text-3xl">Billions {loc.city}</h3>

              <dl className="mt-8 space-y-5 text-sm">
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <dt className="text-eyebrow mb-1 text-subtle">Address</dt>
                  <dd className="max-w-40 text-right leading-relaxed text-muted md:max-w-65">
                    {loc.address}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <dt className="text-eyebrow text-subtle">Phone</dt>
                  <dd>
                    <a
                      href={`tel:${loc.phone}`}
                      className="text-muted transition-colors hover:text-cream"
                    >
                      {loc.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <dt className="text-eyebrow text-subtle">Hours</dt>
                  <dd className="text-muted">{loc.hours}</dd>
                </div>
              </dl>

              {/* Aksi */}
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-cream px-5 py-3 text-eyebrow text-[0.7rem]! text-[#0a0908]! transition-opacity hover:opacity-90"
                >
                  <FaWhatsapp className="size-4 text-[#0a0908]" />
                  Reservasi via WhatsApp
                </a>
                <a
                  href={loc.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-eyebrow text-[0.7rem]! text-foreground transition-colors hover:border-cream/40 hover:text-cream"
                >
                  Show Route
                  <FaArrowRight className="size-2.5" />
                </a>
              </div>

              {/* Order via Gojek/Grab — opsional, tampil kalau link-nya sudah diisi */}
              {(loc.gofoodUrl || loc.grabfoodUrl) && (
                <div className="mt-6 border-t border-border pt-4">
                  <p className="text-eyebrow mb-3 text-subtle">Order via</p>
                  <div className="flex flex-wrap gap-3">
                    {loc.gofoodUrl && (
                      <motion.a
                        href={loc.gofoodUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-eyebrow text-[0.7rem]! text-foreground transition-colors hover:border-cream/40 hover:text-cream"
                      >
                        <SiGojek className="size-4" />
                        GoFood
                      </motion.a>
                    )}
                    {loc.grabfoodUrl && (
                      <motion.a
                        href={loc.grabfoodUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-eyebrow text-[0.7rem]! text-foreground transition-colors hover:border-cream/40 hover:text-cream"
                      >
                        <SiGrab className="size-4" />
                        GrabFood
                      </motion.a>
                    )}
                  </div>
                </div>
              )}

              {/* Sosial media */}
              {/* <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <span className="text-eyebrow text-subtle">Follow Us</span>
                <SocialIcons />
              </div> */}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}