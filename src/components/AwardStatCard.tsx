"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Stat = {
  label: string;
  value: string;
  longValue?: boolean;
};

type ConfettiPiece = {
  id: number;
  startX: number;
  startY: number;
  driftX: number;
  riseY: number;
  fallY: number;
  color: string;
  width: number;
  height: number;
  rotation: number;
  spin: number;
  duration: number;
  delay: number;
  round: boolean;
};

const PARTY_COLORS = [
  "#b45309",
  "#ca8a04",
  "#d97706",
  "#a16207",
  "#92400e",
  "#c2954a",
  "#fbbf24",
  "#fde68a",
];

const statCardClass =
  "relative z-10 flex h-full min-h-[7.75rem] flex-col justify-center rounded-xl p-4 text-center transition-all duration-500 sm:min-h-[8.25rem] sm:p-5";

function createPartyHopper(burstId: number, originX: number): ConfettiPiece[] {
  const count = 14 + Math.floor(Math.random() * 10);

  return Array.from({ length: count }, (_, i) => {
    const spread = (Math.random() - 0.5) * 1.35;
    const power = 0.65 + Math.random() * 0.55;
    const isStreamer = Math.random() > 0.55;

    return {
      id: burstId * 100 + i,
      startX: originX,
      startY: 88 + Math.random() * 8,
      driftX: spread * (55 + Math.random() * 45) * power,
      riseY: -(38 + Math.random() * 52) * power,
      fallY: 28 + Math.random() * 42,
      color: PARTY_COLORS[Math.floor(Math.random() * PARTY_COLORS.length)],
      width: isStreamer ? 2 + Math.random() * 2 : 4 + Math.random() * 4,
      height: isStreamer ? 10 + Math.random() * 12 : 4 + Math.random() * 4,
      rotation: Math.random() * 360,
      spin: (Math.random() - 0.5) * 360,
      duration: 1.55 + Math.random() * 1.05,
      delay: Math.random() * 0.12,
      round: !isStreamer && Math.random() > 0.35,
    };
  });
}

export default function AwardStatCard({
  stat,
  index,
}: {
  stat: Stat;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [flash, setFlash] = useState(false);
  const burstIdRef = useRef(0);
  const spawningRef = useRef(false);
  const spawnTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearSpawnTimers = useCallback(() => {
    spawnTimersRef.current.forEach(clearTimeout);
    spawnTimersRef.current = [];
  }, []);

  const removeBurst = useCallback((burstIds: number[]) => {
    setPieces((prev) => prev.filter((p) => !burstIds.includes(p.id)));
  }, []);

  const launchHopper = useCallback(() => {
    const burstId = burstIdRef.current++;
    const originX = 18 + Math.random() * 64;
    const burst = createPartyHopper(burstId, originX);
    const burstPieceIds = burst.map((p) => p.id);

    setPieces((prev) => [...prev, ...burst]);
    setFlash(true);

    setTimeout(() => setFlash(false), 280);

    const maxDuration =
      Math.max(...burst.map((p) => p.duration + p.delay)) * 1000 + 120;
    setTimeout(() => {
      removeBurst(burstPieceIds);
    }, maxDuration);
  }, [removeBurst]);

  useEffect(() => {
    spawningRef.current = hovered;
    if (!hovered) {
      clearSpawnTimers();
      return;
    }

    let cancelled = false;

    const scheduleHopper = () => {
      if (cancelled || !spawningRef.current) return;

      launchHopper();

      const delay = 520 + Math.random() * 580;
      const timer = setTimeout(scheduleHopper, delay);
      spawnTimersRef.current.push(timer);
    };

    scheduleHopper();
    const secondTimer = setTimeout(() => {
      if (!cancelled && spawningRef.current) launchHopper();
    }, 260);
    spawnTimersRef.current.push(secondTimer);

    return () => {
      cancelled = true;
      clearSpawnTimers();
    };
  }, [hovered, launchHopper, clearSpawnTimers]);

  const handleLeave = () => {
    spawningRef.current = false;
    setHovered(false);
    clearSpawnTimers();
  };

  const handleEnter = () => {
    setHovered(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.08 }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      tabIndex={0}
      className="relative isolate h-full outline-none"
    >
      <div
        className={`pointer-events-none absolute -inset-2 rounded-2xl transition-opacity duration-500 ${
          hovered ? "opacity-70" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(circle, rgba(217,119,6,0.18) 0%, rgba(180,83,9,0.1) 45%, transparent 70%)",
          filter: "blur(10px)",
        }}
      />

      <div
        className={`${statCardClass} glass overflow-hidden ${
          hovered
            ? "border border-amber-600/25 bg-amber-600/[0.04] shadow-[0_0_20px_rgba(217,119,6,0.18),0_0_40px_rgba(180,83,9,0.1),inset_0_0_16px_rgba(217,119,6,0.06)] ring-1 ring-amber-600/25"
            : "border border-transparent ring-1 ring-transparent"
        }`}
      >
        <div
          className={`text-sm font-bold leading-snug transition-colors duration-300 sm:text-base ${
            hovered ? "text-amber-500/90" : "text-accent"
          }`}
        >
          {stat.value}
        </div>
        <div className="mt-1 font-mono text-[10px] leading-tight tracking-wide text-muted uppercase">
          {stat.label}
        </div>
        <div className="mt-2 hidden h-3 lg:block" aria-hidden />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-xl"
      >
        {flash && (
          <motion.div
            initial={{ opacity: 0.4, scale: 0.4 }}
            animate={{ opacity: 0, scale: 1.6 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute bottom-[12%] left-1/2 h-6 w-10 -translate-x-1/2 rounded-full bg-amber-400/30 blur-md"
          />
        )}

        <AnimatePresence>
          {pieces.map((piece) => (
            <motion.span
              key={piece.id}
              initial={{
                opacity: 0,
                scale: 0.2,
                left: `${piece.startX}%`,
                top: `${piece.startY}%`,
                rotate: piece.rotation,
              }}
              animate={{
                opacity: [0, 1, 1, 0.85, 0],
                scale: [0.2, 1, 1, 0.95, 0.7],
                left: [
                  `${piece.startX}%`,
                  `${piece.startX + piece.driftX * 0.45}%`,
                  `${piece.startX + piece.driftX}%`,
                ],
                top: [
                  `${piece.startY}%`,
                  `${piece.startY + piece.riseY}%`,
                  `${piece.startY + piece.riseY + piece.fallY}%`,
                ],
                rotate: piece.rotation + piece.spin,
              }}
              exit={{ opacity: 0, scale: 0.4 }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: [0.18, 0.62, 0.32, 1],
                times: [0, 0.15, 0.5, 0.82, 1],
              }}
              style={{
                backgroundColor: piece.color,
                width: piece.width,
                height: piece.height,
                boxShadow: `0 0 5px ${piece.color}99, 0 0 10px ${piece.color}44`,
              }}
              className={`absolute origin-center ${
                piece.round ? "rounded-full" : "rounded-[1px]"
              }`}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
