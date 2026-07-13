import * as React from "react";
import Image from "next/image";
import type { MenuPageData, MenuItemTag } from "@/lib/menu-data";

const tagLabel: Record<MenuItemTag, string> = {
  signature: "Signature",
  new: "New",
  seasonal: "Seasonal",
};

function CoverFace({
  page,
}: {
  page: Extract<MenuPageData, { type: "cover" }>;
}) {
  return (
    <div className="relative flex h-full flex-col justify-end overflow-hidden">
      <Image
        src={page.image}
        alt={page.imageAlt}
        fill
        sizes="(max-width: 1024px) 90vw, 400px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-b from-background/40 via-background/10 to-background/90" />
      <div className="relative z-10 p-6">
        <p className="text-eyebrow text-cream/70">{page.subtitle}</p>
        <h2 className="text-display text-5xl text-cream">{page.title}</h2>
      </div>
    </div>
  );
}

function CategoryFace({
  page,
}: {
  page: Extract<MenuPageData, { type: "category" }>;
}) {
  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto bg-surface p-6">
      <div>
        <p className="text-eyebrow text-subtle">{page.eyebrow}</p>
        <h3 className="text-display text-2xl text-cream">{page.category}</h3>
      </div>
      <ul className="divide-y divide-border">
        {page.items.map((item) => (
          <li key={item.name} className="flex flex-col gap-1 py-3">
            <div className="flex items-start justify-between gap-3">
              <span className="flex items-center gap-2 font-medium text-cream">
                {item.name}
                {item.tag && (
                  <span className="rounded-full bg-accent px-2 py-0.5 text-[0.6rem] tracking-wide text-accent-fg uppercase">
                    {tagLabel[item.tag]}
                  </span>
                )}
              </span>
              <span className="shrink-0 text-sm text-cream">{item.price}</span>
            </div>
            <p className="text-sm leading-relaxed text-muted">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BackCoverFace({
  page,
}: {
  page: Extract<MenuPageData, { type: "back-cover" }>;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 bg-surface p-6 text-center">
      <h3 className="text-display text-3xl text-cream">{page.title}</h3>
      <p className="max-w-50 text-sm leading-relaxed text-muted">
        {page.note}
      </p>
    </div>
  );
}

type MenuPageProps = {
  page: MenuPageData;
  density?: "hard" | "soft";
};

export const MenuPage = React.forwardRef<HTMLDivElement, MenuPageProps>(
  ({ page, density = "soft" }, ref) => {
    return (
      <div
        ref={ref}
        data-density={density}
        className="page h-full w-full border border-border bg-surface text-cream"
      >
        {page.type === "cover" && <CoverFace page={page} />}
        {page.type === "category" && <CategoryFace page={page} />}
        {page.type === "back-cover" && <BackCoverFace page={page} />}
      </div>
    );
  }
);
MenuPage.displayName = "MenuPage";
