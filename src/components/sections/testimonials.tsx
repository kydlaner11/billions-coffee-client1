"use client";

import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa6";
import { testimonials } from "@/lib/constants";
import { fadeUp, fadeIn, staggerContainer, viewportOnce } from "@/lib/motion";
import { SwipeHint } from "@/components/ui/swipe-hint";

// Menandai kata penting di quote testimoni dengan <span>...</span> di data
// (lihat src/lib/constants.ts) supaya tampil bold/highlight tanpa HTML mentah.
function renderQuote(quote: string) {
  return quote.split(/(<span>.*?<\/span>)/g).map((part, i) => {
    const match = part.match(/^<span>(.*)<\/span>$/);
    if (!match) return part;
    return (
      <strong key={i} className="font-semibold text-cream">
        {match[1]}
      </strong>
    );
  });
}

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex justify-center gap-1"
      aria-label={`${rating} dari 5 bintang`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`size-3.5 ${i < rating ? "fill-cream" : "fill-border"}`}
          aria-hidden="true"
        >
          <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2z" />
        </svg>
      ))}
    </div>
  );
}

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

export function Testimonials() {
  return (
    <section className="mx-auto max-w-350 px-2 pb-16 md:pb-24">
      <SectionHeading>TESTIMONIALS</SectionHeading>

      <motion.div
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scrollbar-none pb-2 [-ms-overflow-style:none] md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer(0.12)}
      >
        {testimonials.map((t) => (
          <motion.div
            key={t.name}
            className="flex w-full shrink-0 snap-center flex-col items-center gap-4 rounded-lg border border-border bg-surface px-6 py-10 text-center md:w-auto md:shrink"
            variants={fadeUp}
            whileHover={{
              y: -6,
              transition: { duration: 0.25, ease: "easeOut" },
            }}
          >
            <FaQuoteLeft className="size-5 text-cream/40" />
            <p className="text-sm leading-relaxed text-muted">
              &ldquo;{renderQuote(t.quote)}&rdquo;
            </p>
            <Stars rating={t.rating} />
            <div>
              <h3 className="text-lg text-cream">{t.name}</h3>
              {/* <p className="text-eyebrow text-subtle">{t.role}</p> */}
            </div>
          </motion.div>
        ))}
      </motion.div>
      <SwipeHint />
    </section>
  );
}
