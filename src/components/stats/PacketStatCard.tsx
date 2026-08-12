"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedStatShell, type Stat } from "./StatCardShell";

const CARS = 6;
const TRAIN_OFFSCREEN = "-55%";
const TRAIN_EXIT = "125%";

type Direction = "ltr" | "rtl";

type TrainInstance = {
  id: number;
  direction: Direction;
  duration: number;
};

function Locomotive({ direction }: { direction: Direction }) {
  const ltr = direction === "ltr";

  return (
    <div className="relative shrink-0">
      <div
        className={`relative flex h-4 w-6 items-center shadow-[0_0_10px_rgba(34,211,238,0.7)] ${
          ltr
            ? "mr-px justify-end rounded-l-md rounded-r-lg bg-gradient-to-r from-cyan-400 to-cyan-300"
            : "ml-px justify-start rounded-l-lg rounded-r-md bg-gradient-to-r from-cyan-300 to-cyan-400"
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full bg-white/90 shadow-[0_0_4px_white] ${
            ltr ? "mr-0.5" : "ml-0.5"
          }`}
        />
        <span
          className={`absolute top-1/2 h-1 w-2 -translate-y-1/2 ${
            ltr
              ? "-left-1 rounded-l bg-cyan-400/80"
              : "-right-1 rounded-r bg-cyan-400/80"
          }`}
        />
      </div>
      <div
        className={`absolute top-1/2 h-px w-9 -translate-y-1/2 ${
          ltr
            ? "-left-9 bg-gradient-to-r from-transparent via-cyan-300/45 to-cyan-300/75"
            : "-right-9 bg-gradient-to-l from-transparent via-cyan-300/45 to-cyan-300/75"
        }`}
      />
    </div>
  );
}

function TrainCars() {
  return (
    <>
      {Array.from({ length: CARS }).map((_, i) => (
        <div
          key={i}
          className="mx-px flex h-3 w-3.5 shrink-0 flex-col items-center justify-center rounded-sm border border-cyan-400/35 bg-cyan-500/25"
        >
          <span className="h-0.5 w-1.5 rounded-sm bg-cyan-200/70" />
        </div>
      ))}
    </>
  );
}

function MovingTrain({
  direction,
  duration,
  onComplete,
}: {
  direction: Direction;
  duration: number;
  onComplete: () => void;
}) {
  const ltr = direction === "ltr";

  return (
    <motion.div
      className="absolute bottom-2.5 flex items-end will-change-transform"
      initial={{ left: ltr ? TRAIN_OFFSCREEN : TRAIN_EXIT }}
      animate={{ left: ltr ? TRAIN_EXIT : TRAIN_OFFSCREEN }}
      transition={{ duration, ease: "linear" }}
      onAnimationComplete={onComplete}
    >
      {ltr ? (
        <>
          <TrainCars />
          <Locomotive direction="ltr" />
        </>
      ) : (
        <>
          <Locomotive direction="rtl" />
          <TrainCars />
        </>
      )}
    </motion.div>
  );
}

function BulletTrainTrack({
  spawning,
  onIdle,
}: {
  spawning: boolean;
  onIdle: () => void;
}) {
  const [train, setTrain] = useState<TrainInstance | null>(null);
  const idRef = useRef(0);
  const hadActivityRef = useRef(false);
  const spawningRef = useRef(spawning);
  const trainActiveRef = useRef(false);
  const spawnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    spawningRef.current = spawning;
  }, [spawning]);

  useEffect(() => {
    trainActiveRef.current = train !== null;
  }, [train]);

  const clearSpawnTimer = useCallback(() => {
    if (spawnTimerRef.current) {
      clearTimeout(spawnTimerRef.current);
      spawnTimerRef.current = null;
    }
  }, []);

  const spawnTrain = useCallback(() => {
    if (trainActiveRef.current) return;

    trainActiveRef.current = true;
    const direction: Direction = Math.random() < 0.5 ? "ltr" : "rtl";
    const duration = 0.72 + Math.random() * 0.38;

    setTrain({
      id: ++idRef.current,
      direction,
      duration,
    });
  }, []);

  const handleTrainComplete = useCallback(() => {
    setTrain(null);
    trainActiveRef.current = false;

    if (!spawningRef.current) return;

    clearSpawnTimer();
    spawnTimerRef.current = setTimeout(
      spawnTrain,
      100 + Math.random() * 150,
    );
  }, [clearSpawnTimer, spawnTrain]);

  useEffect(() => {
    if (!spawning) {
      clearSpawnTimer();
      return;
    }

    if (!trainActiveRef.current) {
      spawnTrain();
    }

    return clearSpawnTimer;
  }, [spawning, spawnTrain, clearSpawnTimer]);

  useEffect(() => {
    if (spawning || train) {
      hadActivityRef.current = true;
      return;
    }

    if (hadActivityRef.current) {
      hadActivityRef.current = false;
      onIdle();
    }
  }, [spawning, train, onIdle]);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-9 overflow-hidden rounded-b-xl">
      <div className="absolute inset-x-3 bottom-1.5 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      <div className="absolute bottom-1.5 left-3 h-1 w-1 rounded-full bg-cyan-400/30" />
      <div className="absolute bottom-1.5 right-3 h-1 w-1 rounded-full bg-cyan-400/30" />

      {train ? (
        <MovingTrain
          key={train.id}
          direction={train.direction}
          duration={train.duration}
          onComplete={handleTrainComplete}
        />
      ) : null}
    </div>
  );
}

export default function PacketStatCard({
  stat,
  index,
}: {
  stat: Stat;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [trackVisible, setTrackVisible] = useState(false);

  const handleEnter = () => {
    setHovered(true);
    setTrackVisible(true);
  };

  const handleLeave = () => {
    setHovered(false);
  };

  const handleTrackIdle = useCallback(() => {
    setTrackVisible(false);
  }, []);

  return (
    <AnimatedStatShell
      stat={stat}
      index={index}
      variant="cyan"
      hovered={hovered}
      onEnter={handleEnter}
      onLeave={handleLeave}
      underlay={
        trackVisible ? (
          <BulletTrainTrack spawning={hovered} onIdle={handleTrackIdle} />
        ) : null
      }
    />
  );
}
