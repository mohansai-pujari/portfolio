"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { rotatingHighlights } from "@/data/portfolio";
import { asArray, moduloIndex } from "@/lib/safe-data";

const DEFAULT_HIGHLIGHTS = ["Building scalable backend systems"];

export default function RotatingHighlight() {
  const highlights = useMemo(() => {
    const items = asArray(rotatingHighlights).filter(
      (item): item is string => typeof item === "string" && item.trim().length > 0,
    );
    return items.length > 0 ? items : DEFAULT_HIGHLIGHTS;
  }, []);

  const [index, setIndex] = useState(0);
  const activeHighlight = highlights[moduloIndex(index, highlights.length)] ?? DEFAULT_HIGHLIGHTS[0];

  useEffect(() => {
    if (highlights.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => moduloIndex(prev + 1, highlights.length));
    }, 3000);
    return () => clearInterval(timer);
  }, [highlights.length]);

  return (
    <div className="mt-6 min-h-10 max-w-xl overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={activeHighlight}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="flex items-center gap-3 text-base leading-relaxed sm:text-lg"
        >
          <span className="shrink-0 text-accent">→</span>
          <span className="gradient-text font-medium">{activeHighlight}</span>
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
