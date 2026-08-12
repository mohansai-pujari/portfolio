"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedStatShell, type Stat } from "./StatCardShell";

export default function LatencyStatCard({
  stat,
  index,
}: {
  stat: Stat;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <AnimatedStatShell
      stat={stat}
      index={index}
      variant="violet"
      hovered={hovered}
      onEnter={() => setHovered(true)}
      onLeave={() => setHovered(false)}
      overlay={
        hovered ? (
          <div className="relative flex h-full flex-col justify-end px-3 pb-3 pt-8">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: "-10%" }}
                animate={{ opacity: [0, 0.45, 0], x: ["-10%", "110%"] }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.35,
                  repeat: Infinity,
                  repeatDelay: 0.6,
                  ease: "easeInOut",
                }}
                className="absolute h-px w-10 bg-gradient-to-r from-transparent via-accent-violet/40 to-transparent"
                style={{ top: `${28 + i * 14}%` }}
              />
            ))}

            <div className="relative z-10 mb-1.5 flex items-center justify-between font-mono text-[9px] sm:text-[10px]">
              <motion.span
                initial={{ opacity: 0.5 }}
                animate={{ opacity: [0.5, 0.3, 0.2] }}
                transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse" }}
                className="text-muted line-through"
              >
                70 ms
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-accent"
              >
                10 ms
              </motion.span>
            </div>

            <div className="relative z-10 h-1.5 overflow-hidden rounded-full bg-white/5">
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "14%" }}
                transition={{ duration: 1.6, ease: [0.22, 0.61, 0.36, 1], repeat: Infinity, repeatDelay: 0.8 }}
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent-violet/80 to-accent"
              />
            </div>
          </div>
        ) : null
      }
    />
  );
}
