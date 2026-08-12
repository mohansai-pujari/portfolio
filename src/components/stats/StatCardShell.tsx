import { motion } from "framer-motion";
import type { ReactNode } from "react";

export type Stat = {
  label: string;
  value: string;
  longValue?: boolean;
};

export const statCardInnerClass =
  "relative z-10 flex h-full min-h-[7.75rem] flex-col justify-center rounded-xl p-4 text-center transition-all duration-500 sm:min-h-[8.25rem] sm:p-5";

type GlowVariant = "cyan" | "green" | "violet";

const glowStyles: Record<GlowVariant, { halo: string; card: string; text: string }> = {
  cyan: {
    halo: "radial-gradient(circle, rgba(6,182,212,0.16) 0%, rgba(6,182,212,0.08) 45%, transparent 70%)",
    card: "border border-cyan-500/25 bg-cyan-500/[0.04] shadow-[0_0_20px_rgba(6,182,212,0.15),inset_0_0_16px_rgba(6,182,212,0.05)] ring-1 ring-cyan-500/25",
    text: "text-cyan-400/90",
  },
  green: {
    halo: "radial-gradient(circle, rgba(16,185,129,0.16) 0%, rgba(16,185,129,0.08) 45%, transparent 70%)",
    card: "border border-accent/25 bg-accent/[0.04] shadow-[0_0_20px_rgba(16,185,129,0.15),inset_0_0_16px_rgba(16,185,129,0.05)] ring-1 ring-accent/25",
    text: "text-accent/90",
  },
  violet: {
    halo: "radial-gradient(circle, rgba(139,92,246,0.16) 0%, rgba(16,185,129,0.08) 45%, transparent 70%)",
    card: "border border-accent-violet/25 bg-accent-violet/[0.04] shadow-[0_0_20px_rgba(139,92,246,0.15),inset_0_0_16px_rgba(16,185,129,0.05)] ring-1 ring-accent-violet/25",
    text: "text-accent-violet/90",
  },
};

export function AnimatedStatShell({
  stat,
  index,
  variant,
  hovered,
  onEnter,
  onLeave,
  overlay,
  underlay,
  topOverlay,
}: {
  stat: Stat;
  index: number;
  variant: GlowVariant;
  hovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
  overlay?: ReactNode;
  underlay?: ReactNode;
  topOverlay?: ReactNode;
}) {
  const glow = glowStyles[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.08 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      tabIndex={0}
      className="relative isolate h-full outline-none"
    >
      <div
        className={`pointer-events-none absolute -inset-2 rounded-2xl transition-opacity duration-500 ${
          hovered ? "opacity-70" : "opacity-0"
        }`}
        style={{ background: glow.halo, filter: "blur(10px)" }}
      />

      <div
        className={`${statCardInnerClass} glass relative overflow-hidden ${
          hovered ? glow.card : "border border-transparent ring-1 ring-transparent"
        }`}
      >
        {underlay}

        <div className="relative z-10">
          <div
            className={`text-xl font-bold transition-colors duration-300 sm:text-2xl ${
              hovered ? glow.text : "text-accent"
            }`}
          >
            {stat.value}
          </div>
          <div className="mt-1 font-mono text-[10px] leading-tight tracking-wide text-muted uppercase">
            {stat.label}
          </div>
          <div className="mt-2 hidden h-3 lg:block" aria-hidden />
        </div>
      </div>

      {topOverlay && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-full z-30 mb-0.5 h-[4.5rem] overflow-visible sm:h-20"
        >
          {topOverlay}
        </div>
      )}

      {overlay && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-xl"
        >
          {overlay}
        </div>
      )}
    </motion.div>
  );
}
