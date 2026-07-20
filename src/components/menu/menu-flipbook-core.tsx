"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
// Stylesheet resmi dari engine StPageFlip (bukan react-pageflip) — wajib di-import
// manual karena react-pageflip tidak membundelnya. Tanpa ini, .stf__parent kehilangan
// `touch-action: pan-y`, jadi browser mobile "berebut" gesture sentuh dengan drag
// flip milik library sehingga terasa nge-lag/tidak nyaman.
import "page-flip/src/Style/stPageFlip.css";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MenuPage } from "@/components/menu/menu-page";
import { menuPages } from "@/lib/menu-data";

type FlipEvent = { data: number };

// Jumlah halaman di kiri & kanan posisi sekarang yang dimuat eager. react-pageflip
// men-display:none semua halaman di luar spread aktif, jadi lazy-loading bawaan
// next/image tidak pernah terpicu untuk halaman yang belum pernah aktif — window
// ini yang memastikan halaman di sekitar posisi user sudah siap sebelum di-flip ke.
const EAGER_WINDOW = 3;

// react-pageflip menghitung tinggi murni dari lebar × rasio (width/height di
// bawah), bukan dari tinggi kontainer — jadi ukuran "desktop" yang lebih besar
// gampang lebih tinggi daripada viewport ponsel dan memaksa halaman /menu
// scroll. Profil "mobile" ini sengaja lebih kecil supaya muat dalam satu layar
// (lihat menu-split.tsx yang mengunci section ke h-dvh di breakpoint ini).
const SIZE_DESKTOP = {
  width: 340,
  height: 420,
  minWidth: 280,
  maxWidth: 500,
  minHeight: 346,
  maxHeight: 618,
} as const;
const SIZE_MOBILE = {
  width: 260,
  height: 322,
  minWidth: 220,
  maxWidth: 340,
  minHeight: 272,
  maxHeight: 420,
} as const;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    setIsMobile(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}

export function MenuFlipbookCore() {
  const flipBookRef = useRef<{ pageFlip: () => { flipPrev: () => void; flipNext: () => void } } | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const isMobile = useIsMobile();
  const size = isMobile ? SIZE_MOBILE : SIZE_DESKTOP;

  const unlockedRef = useRef(false);

  // Flip cepat berturut-turut (umum di mobile) memicu onFlip berkali-kali dalam
  // waktu singkat. Kalau semua pakai satu <audio> yang sama, currentTime/play()
  // yang baru akan menginterupsi play() sebelumnya yang belum selesai — makanya
  // suara jadi kadang kepotong/kecepatan, kadang gagal (promise-nya di-abort dan
  // ditelan .catch). Solusinya: clone elemen audio tiap flip supaya tiap suara
  // punya instance sendiri dan boleh tumpang tindih dengan aman.
  const handleFlip = useCallback((e: FlipEvent) => {
    setCurrentPage(e.data);
    const el = audioRef.current;
    if (!el) return;
    const instance = el.cloneNode(true) as HTMLAudioElement;
    instance.volume = el.volume;
    instance.play().catch(() => {});
  }, []);

  // Browser modern memblokir audio.play() kalau tidak terhubung langsung ke user
  // gesture. Event "flip" dari react-pageflip baru muncul setelah animasi flip
  // selesai (~flippingTime ms kemudian), jadi sudah di luar jendela gesture.
  // Unlock elemen audio sekali di gesture pertama (pointerdown) supaya play()
  // yang terlambat di atas (termasuk clone-nya) tetap diizinkan browser untuk
  // sisa sesi.
  const unlockAudio = useCallback(() => {
    if (unlockedRef.current) return;
    unlockedRef.current = true;
    const el = audioRef.current;
    if (!el) return;
    el.play()
      .then(() => el.pause())
      .catch(() => {});
  }, []);

  const goPrev = () => flipBookRef.current?.pageFlip().flipPrev();
  const goNext = () => flipBookRef.current?.pageFlip().flipNext();

  return (
    <div
      className="flex w-full min-h-0 flex-1 flex-col items-center justify-center gap-2 md:flex-none md:gap-4"
      onPointerDown={unlockAudio}
    >
      <audio ref={audioRef} src="/sounds/page-flip.mp3" preload="auto" />

      <div className="mx-auto w-full min-h-0 flex-1 max-w-100 sm:max-w-110 md:flex-none lg:max-w-125">
        <HTMLFlipBook
          key={isMobile ? "mobile" : "desktop"}
          width={size.width}
          height={size.height}
          size="stretch"
          minWidth={size.minWidth}
          maxWidth={size.maxWidth}
          minHeight={size.minHeight}
          maxHeight={size.maxHeight}
          startPage={0}
          drawShadow
          flippingTime={900}
          usePortrait
          startZIndex={0}
          autoSize
          maxShadowOpacity={0.6}
          showCover
          mobileScrollSupport
          clickEventForward
          useMouseEvents
          swipeDistance={30}
          showPageCorners
          disableFlipByClick={false}
          className="mx-auto"
          style={{}}
          ref={flipBookRef}
          onFlip={handleFlip}
        >
          {menuPages.map((page, i) => (
            <MenuPage
              key={page.id}
              page={page}
              density={
                i === 0 || i === menuPages.length - 1 ? "hard" : "soft"
              }
              priority={i === 0}
              eager={Math.abs(i - currentPage) <= EAGER_WINDOW}
            />
          ))}
        </HTMLFlipBook>
      </div>

      <div className="flex shrink-0 items-center gap-2 md:gap-4">
        <Button
          variant="outline"
          size="icon"
          aria-label="Halaman sebelumnya"
          onClick={goPrev}
          disabled={currentPage === 0}
        >
          <ChevronLeft />
        </Button>
        <span className="text-eyebrow relative inline-flex min-w-24 justify-center overflow-hidden text-subtle">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={currentPage}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              Page {currentPage + 1} of {menuPages.length}
            </motion.span>
          </AnimatePresence>
        </span>
        <Button
          variant="outline"
          size="icon"
          aria-label="Halaman berikutnya"
          onClick={goNext}
          disabled={currentPage === menuPages.length - 1}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
