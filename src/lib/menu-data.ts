export type MenuPageImage = {
  id: string;
  src: string;
  alt: string;
};
 
const swipePageNumbers = Array.from({ length: 29 }, (_, i) => i + 1).filter(
  (n) => n !== 4 && n !== 5
);
 
// Cache-busting: ganti nilai ini (mis. ke tanggal deploy) SETIAP KALI ada foto
// yang kontennya diganti tapi nama filenya reused (mis. "6.jpg" lama ditimpa
// dengan isi baru). Tanpa ini, browser yang pernah buka situs sebelumnya akan
// terus menampilkan gambar lama dari cache-nya sendiri karena URL-nya identik
// — baru hilang kalau user hard refresh atau buka incognito. Menaikkan versi
// di sini mengubah URL (?v=...) sehingga dianggap resource baru oleh browser.
const ASSET_VERSION = "20260907";
 
export const menuPages: readonly MenuPageImage[] = swipePageNumbers.map(
  (n) => ({
    id: `page-${n}`,
    src: `/menu/swipe/${n}.jpg?v=${ASSET_VERSION}`,
    alt: `Halaman menu Billions Coffee ${n}`,
  })
);