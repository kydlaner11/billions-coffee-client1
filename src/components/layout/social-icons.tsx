"use client";

import { motion } from "framer-motion";
import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { socialLinks } from "@/lib/constants";

const iconMap: Record<string, IconType> = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  twitter: FaXTwitter,
};

export function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socialLinks.map((s) => {
        const Icon = iconMap[s.icon] ?? FaInstagram;
        return (
          <motion.a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex size-7 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-cream hover:text-cream"
          >
            <Icon className="size-3" />
          </motion.a>
        );
      })}
    </div>
  );
}