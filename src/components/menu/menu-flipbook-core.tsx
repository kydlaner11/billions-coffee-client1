"use client";

import { useCallback, useRef, useState } from "react";
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

export function MenuFlipbookCore() {
  const flipBookRef = useRef<{ pageFlip: () => { flipPrev: () => void; flipNext: () => void } } | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentPage, setCurrentPage] = useState(0);

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
      className="flex w-full flex-col items-center gap-4"
      onPointerDown={unlockAudio}
    >
      <audio ref={audioRef} src="/sounds/page-flip.mp3" preload="auto" />

      <div className="mx-auto w-full max-w-100 sm:max-w-110 lg:max-w-125">
        <HTMLFlipBook
          width={340}
          height={420}
          size="stretch"
          minWidth={280}
          maxWidth={500}
          minHeight={346}
          maxHeight={618}
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
            />
          ))}
        </HTMLFlipBook>
      </div>

      <div className="flex items-center gap-4">
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
