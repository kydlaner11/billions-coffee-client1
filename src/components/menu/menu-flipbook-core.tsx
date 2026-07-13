"use client";

import { useCallback, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MenuPage } from "@/components/menu/menu-page";
import { menuPages } from "@/lib/menu-data";

type FlipEvent = { data: number };

export function MenuFlipbookCore() {
  const flipBookRef = useRef<{ pageFlip: () => { flipPrev: () => void; flipNext: () => void } } | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const handleFlip = useCallback((e: FlipEvent) => {
    setCurrentPage(e.data);
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = 0;
    // File suara belum tersedia sampai user menaruh public/sounds/page-flip.mp3 —
    // .catch menelan 404/rejection supaya flip tetap jalan tanpa error.
    el.play().catch(() => {});
  }, []);

  const goPrev = () => flipBookRef.current?.pageFlip().flipPrev();
  const goNext = () => flipBookRef.current?.pageFlip().flipNext();

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <audio ref={audioRef} src="/sounds/page-flip.mp3" preload="none" />

      <div className="mx-auto w-full max-w-90 sm:max-w-100 lg:max-w-115">
        <HTMLFlipBook
          width={300}
          height={420}
          size="stretch"
          minWidth={250}
          maxWidth={500}
          minHeight={350}
          maxHeight={700}
          startPage={0}
          drawShadow
          flippingTime={700}
          usePortrait
          startZIndex={0}
          autoSize
          maxShadowOpacity={0.5}
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
          {menuPages.map((page) => (
            <MenuPage
              key={page.id}
              page={page}
              density={page.type === "category" ? "soft" : "hard"}
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
        <span className="text-eyebrow text-subtle">
          Page {currentPage + 1} of {menuPages.length}
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
