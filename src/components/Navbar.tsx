"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { navLinks, personal } from "@/data/portfolio";
import { asArray, asNonEmptyString } from "@/lib/safe-data";
import { RESUME_DOWNLOAD_PATH } from "@/lib/resume";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <a href="#" className="group flex shrink-0 items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10 font-mono text-xs font-bold text-accent ring-1 ring-accent/20 transition group-hover:bg-accent/20 sm:h-8 sm:w-8 sm:text-sm">
            MS
          </span>
          <span className="hidden font-mono text-sm text-muted lg:block">
            {asNonEmptyString(personal?.firstName, "portfolio").toLowerCase()}.dev
          </span>
        </a>

        <ul className="flex min-w-0 flex-1 items-center justify-end gap-0.5 overflow-x-auto sm:gap-1">
          {asArray(navLinks).map((link) => (
            <li key={link?.href ?? link?.label} className="shrink-0">
              <a
                href={asNonEmptyString(link?.href, "#")}
                className="whitespace-nowrap rounded-lg px-2 py-1.5 font-mono text-[10px] tracking-wide text-muted transition hover:bg-white/5 hover:text-foreground sm:px-3 sm:py-2 sm:text-xs md:px-4"
              >
                {asNonEmptyString(link?.label, "Link")}
              </a>
            </li>
          ))}
          <li className="shrink-0">
            <a
              href={RESUME_DOWNLOAD_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-0.5 whitespace-nowrap rounded-lg bg-accent/10 px-2 py-1.5 font-mono text-[10px] tracking-wide text-accent ring-1 ring-accent/30 transition hover:bg-accent/20 sm:ml-1 sm:px-3 sm:py-2 sm:text-xs md:px-4"
            >
              Resume ↓
            </a>
          </li>
        </ul>
      </nav>
    </motion.header>
  );
}
