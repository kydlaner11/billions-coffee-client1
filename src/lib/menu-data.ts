// Billions Coffee — data menu untuk flip-book.
// Sumber: public/menu/swipe/1.jpg .. 31.jpg (halaman menu asli, hasil export desain).
// Catatan: file "5.jpg" belum ada di public/menu/swipe, jadi nomor itu dilewati.

export type MenuPageImage = {
  id: string;
  src: string;
  alt: string;
};

const swipePageNumbers = Array.from({ length: 31 }, (_, i) => i + 1).filter(
  (n) => n !== 5
);

export const menuPages: readonly MenuPageImage[] = swipePageNumbers.map(
  (n) => ({
    id: `page-${n}`,
    src: `/menu/swipe/${n}.jpg`,
    alt: `Halaman menu Billions Coffee ${n}`,
  })
);
