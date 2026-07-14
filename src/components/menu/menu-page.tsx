import * as React from "react";
import Image from "next/image";
import type { MenuPageImage } from "@/lib/menu-data";

type MenuPageProps = {
  page: MenuPageImage;
  density?: "hard" | "soft";
  priority?: boolean;
};

export const MenuPage = React.forwardRef<HTMLDivElement, MenuPageProps>(
  ({ page, density = "soft", priority = false }, ref) => {
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
          sizes="(max-width: 1024px) 90vw, 500px"
          className="object-contain"
        />
      </div>
    );
  }
);
MenuPage.displayName = "MenuPage";
