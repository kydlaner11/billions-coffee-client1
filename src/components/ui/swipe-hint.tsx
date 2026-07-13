"use client";

import { motion } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";

export function SwipeHint() {
  return (
    <motion.div
      className="mt-3 flex items-center justify-center gap-2 text-eyebrow text-subtle md:hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        animate={{ x: [-4, 4, -4] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowLeftRight className="size-3.5" />
      </motion.span>
      Geser untuk lihat lainnya
    </motion.div>
  );
}
