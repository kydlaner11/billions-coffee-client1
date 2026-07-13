"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  siteConfig,
  navLinks,
  primaryNavLinks,
  ctaLink,
} from "@/lib/constants";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
    <nav
      aria-label="Utama"
      className="mx-auto max-w-350 px-2 py-5"
    >
      {/* Satu grup rapat di kiri */}
      <motion.div
        className="inline-flex items-center gap-4 rounded-2xl bg-black/85 px-3 py-2.5 backdrop-blur-sm"
        initial="hidden"
        animate="visible"
        variants={staggerContainer(0.08)}
      >
        {/* Hamburger */}
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Buka menu"
          variants={fadeUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          className="flex size-11 items-center justify-center rounded-md border border-border bg-surface/60 transition-colors hover:bg-surface-2"
        >
          <Menu className="size-5 text-foreground" />
        </motion.button>

        {/* Logo */}
        <motion.div variants={fadeUp} whileHover={{ scale: 1.05 }}>
          <Link
            href="/"
            aria-label={`${siteConfig.name} beranda`}
            // className="flex size-11 items-center justify-center rounded-md border border-border bg-surface/60"
          >
            <Image
              src={siteConfig.logo}
              alt={siteConfig.name}
              width={80}
              height={80}
              priority
              className="h-12 w-auto object-contain"
            />
          </Link>
        </motion.div>

        {/* Link inline (desktop) */}
        <div className="hidden items-center gap-6 pl-2 md:flex">
          {primaryNavLinks.map((link) => (
            <motion.div key={link.href} variants={fadeUp}>
              <Link
                href={link.href}
                className="text-eyebrow text-foreground/80 transition-colors hover:text-cream"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div variants={fadeUp}>
          <Button
            variant="outline"
            render={<Link href={ctaLink.href} />}
            nativeButton={false}
            className="text-eyebrow ml-1 rounded-lg border-border bg-transparent"
          >
            {ctaLink.label}
          </Button>
        </motion.div>
      </motion.div>
    </nav>
    <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="top"
          className="fixed! inset-0! z-50! h-dvh! w-screen! max-w-none! translate-x-0! translate-y-0! rounded-none! border-none! bg-background! p-0! shadow-none!"
        >
          <SheetTitle className="sr-only">Menu navigasi</SheetTitle>

          <div className="relative flex h-full flex-col items-center justify-center">
            {/* Ornamen atas */}
            <span className="mb-6 block h-px w-16 bg-border" />

            <motion.ul
              className="flex flex-col items-center gap-2 text-center"
              initial="hidden"
              animate={open ? "visible" : "hidden"}
              variants={staggerContainer(0.08, 0.1)}
            >
              {navLinks.map((link) => (
                <motion.li key={link.href} variants={fadeUp}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-display text-4xl uppercase tracking-tight text-cream transition-opacity hover:opacity-70 sm:text-5xl md:text-6xl"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            {/* Ornamen bawah */}
            <span className="mt-6 block h-px w-16 bg-border" />
          </div>
        </SheetContent>
      </Sheet>
  </header>
  );
}