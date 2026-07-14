"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  siteConfig,
  navLinks,
  contactInfo,
  footerLinks,
  footerConfig,
} from "@/lib/constants";
import { SocialIcons } from "@/components/layout/social-icons";
import { fadeIn, fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function Footer() {
  return (
    <footer className="border-t border-border">
      {/* ===== Bagian atas: brand + nav + kontak — disembunyikan di mobile ===== */}
      <div className="mx-auto hidden max-w-350 px-2 py-14 md:block md:py-20">
        <motion.div
          className="grid gap-10 md:grid-cols-3 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.15)}
        >
          {/* --- Blok 1: Brand --- */}
          <motion.div className="space-y-4" variants={fadeUp}>
            <Link href="/" className="text-display text-3xl text-cream">
              {siteConfig.name}
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              {siteConfig.description}
            </p>
            <SocialIcons />
          </motion.div>

          {/* --- Blok 2: Navigasi --- */}
          <motion.div className="md:justify-self-center" variants={fadeUp}>
            <h3 className="text-eyebrow mb-4 text-subtle">Explore</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* --- Blok 3: Kontak umum --- */}
          {/* <motion.div className="md:justify-self-end" variants={fadeUp}>
            <h3 className="text-eyebrow mb-4 text-subtle">Get in Touch</h3>
            <address className="space-y-2 text-sm not-italic text-muted">
              <p className="max-w-xs">{contactInfo.address}</p>
              <p>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="transition-colors hover:text-cream"
                >
                  {contactInfo.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="transition-colors hover:text-cream"
                >
                  {contactInfo.email}
                </a>
              </p>
            </address>
          </motion.div> */}
        </motion.div>
      </div>

      {/* ===== Bar bawah: kredit + link ===== */}
      <div className="md:border-t md:border-border">
        <motion.div
          className="mx-auto flex max-w-350 flex-col items-center gap-4 px-6 py-6 text-xs text-subtle md:flex-row md:justify-center md:gap-6 md:px-10"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeIn}
        >
          <span>{footerConfig.credit}</span>
          {/* {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-cream"
            >
              {link.label}
            </Link>
          ))} */}
        </motion.div>
      </div>
    </footer>
  );
}