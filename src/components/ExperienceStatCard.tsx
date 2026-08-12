"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { experienceSkillBubbles } from "@/data/portfolio";
import { asArray, pickRandom } from "@/lib/safe-data";

type Stat = {
  label: string;
  value: string;
  longValue?: boolean;
};

type ActiveBubble = {
  id: number;
  label: string;
  x: number;
  xDrift: number;
  duration: number;
};

function randomSkill() {
  return pickRandom(asArray(experienceSkillBubbles), "Backend");
}

function createBubble(id: number): ActiveBubble {
  const x = (Math.random() - 0.5) * 100;
  return {
    id,
    label: randomSkill(),
    x,
    xDrift: x + (Math.random() - 0.5) * 30,
    duration: 1.6 + Math.random() * 0.8,
  };
}

export default function ExperienceStatCard({
  stat,
  index,
}: {
  stat: Stat;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [bubbles, setBubbles] = useState<ActiveBubble[]>([]);
  const bubbleIdRef = useRef(0);
  const hoveredRef = useRef(false);

  useEffect(() => {
    hoveredRef.current = hovered;
    if (!hovered) {
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout>;

    const emitBubble = () => {
      if (!hoveredRef.current) return;

      const bubble = createBubble(bubbleIdRef.current++);
      setBubbles((prev) => [...prev, bubble]);

      setTimeout(() => {
        setBubbles((prev) => prev.filter((b) => b.id !== bubble.id));
      }, bubble.duration * 1000 + 100);

      const delay = 400 + Math.random() * 500;
      timeoutId = setTimeout(emitBubble, delay);
    };

    emitBubble();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [hovered]);

  const handleLeave = () => {
    hoveredRef.current = false;
    setHovered(false);
    setBubbles([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      onFocus={() => setHovered(true)}
      onBlur={handleLeave}
      tabIndex={0}
      className="relative isolate h-full outline-none"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-full z-30 h-36 overflow-hidden"
      >
        <AnimatePresence>
          {bubbles.map((bubble) => (
            <motion.span
              key={bubble.id}
              initial={{ opacity: 0, scale: 0.4, x: bubble.x, y: 0 }}
              animate={{
                opacity: [0, 1, 0.85, 0],
                scale: [0.4, 1, 1, 0.75],
                x: [bubble.x, bubble.xDrift],
                y: [0, -45, -100, -140],
              }}
              exit={{ opacity: 0, scale: 0.4 }}
              transition={{
                duration: bubble.duration,
                ease: "easeOut",
              }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 font-mono text-[10px] text-accent shadow-md shadow-accent/10 backdrop-blur-sm sm:text-[11px]"
            >
              {bubble.label}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <div
        className={`glass flex h-full min-h-[7.75rem] flex-col justify-center rounded-xl p-4 text-center ring-1 transition-[box-shadow,ring-color] duration-300 sm:min-h-[8.25rem] sm:p-5 ${
          hovered ? "ring-accent/30 shadow-lg shadow-accent/10" : "ring-transparent"
        }`}
      >
        <div className="text-xl font-bold text-accent sm:text-2xl">{stat.value}</div>
        <div className="mt-1 font-mono text-[10px] tracking-wide text-muted uppercase">
          {stat.label}
        </div>
        <div className="mt-2 hidden h-3 lg:block" aria-hidden />
      </div>
    </motion.div>
  );
}
