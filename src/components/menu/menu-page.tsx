import * as React from "react";
import Image from "next/image";
import type { MenuPageImage } from "@/lib/menu-data";

type MenuPageProps = {
  page: MenuPageImage;
  density?: "hard" | "soft";
  priority?: boolean;
  // Halaman flipbook di-toggle `display:none` oleh react-pageflip sampai
  // gilirannya tampil, jadi lazy-loading bawaan (berbasis IntersectionObserver)
  // tidak pernah terpicu untuk halaman yang belum aktif — gambar baru mulai
  // fetch begitu user sudah flip ke sana, telat. `eager` dipakai untuk
  // halaman di sekitar posisi saat ini supaya sudah siap sebelum dibutuhkan.
  eager?: boolean;
};

export const MenuPage = React.forwardRef<HTMLDivElement, MenuPageProps>(
  ({ page, density = "soft", priority = false, eager = false }, ref) => {
    return (
      <div
        ref={ref}
        data-density={density}
        className="page relative h-full w-full overflow-hidden border border-border bg-surface"
      >
        <Image
          src={page.src}
          alt={page.alt}
          fill
          priority={priority}
          loading={priority ? undefined : eager ? "eager" : "lazy"}
          sizes="(max-width: 1024px) 90vw, 500px"
          className="object-contain"
        />
      </div>
    );
  }
);
MenuPage.displayName = "MenuPage";
