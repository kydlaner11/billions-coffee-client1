"use client";

import dynamic from "next/dynamic";
import { MenuFlipbookSkeleton } from "@/components/menu/menu-flipbook-skeleton";

const MenuFlipbookCore = dynamic(
  () =>
    import("@/components/menu/menu-flipbook-core").then(
      (m) => m.MenuFlipbookCore
    ),
  { ssr: false, loading: () => <MenuFlipbookSkeleton /> }
);

export function MenuFlipbook() {
  return <MenuFlipbookCore />;
}
