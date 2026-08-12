"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { personal } from "@/data/portfolio";
import { asNonEmptyString, splitWords } from "@/lib/safe-data";
import MinionCharacter from "./MinionCharacter";

type Phase = "idle" | "falling" | "reacting" | "building" | "done" | "leaving";

type WordToken = {
  id: string;
  text: string;
  fallY: number;
  fallX: number;
  rotate: number;
  delay: number;
};

const WORD_CLASS = "relative inline-block origin-center text-muted";

const SECOND_PARAGRAPH =
  "Strong expertise in system design, backend architecture, and production-scale applications — focused on scalability, reliability, maintainability, and performance.";

const LEADER_LINE = "Banana! Word salad detected. Pulley team — assemble!";

const DONE_LINE = "Ta-da! Wall rebuilt. Bananas for everyone.";

const DRAG_LINE = "Wrong way! ...No, THIS way!";

const ROPE_ANCHORS = [16, 50, 84];

const PHASE_MS = {
  falling: 1800,
  reacting: 2500,
  building: 3000,
  done: 2000,
  leaving: 3200,
} as const;

/** Stable pseudo-random — avoids SSR/client hydration mismatch. */
function seededUnit(seed: string, salt: number): number {
  let hash = salt;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  return (Math.abs(hash) % 1000) / 1000;
}

function buildWordTokens(paragraphs: string[]): WordToken[] {
  const tokens: WordToken[] = [];

  paragraphs.forEach((paragraph, paragraphIndex) => {
    splitWords(paragraph).forEach((text, wordIndex) => {
      const id = `${paragraphIndex}-${wordIndex}`;
      tokens.push({
        id,
        text,
        fallY: 72 + seededUnit(id, 1) * 36,
        fallX: (seededUnit(id, 2) - 0.5) * 24,
        rotate: (seededUnit(id, 3) - 0.5) * 36,
        delay: wordIndex * 0.03 + seededUnit(id, 4) * 0.05,
      });
    });
  });

  return tokens;
}

function Ladder({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 64"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <line x1="4" y1="4" x2="4" y2="60" />
      <line x1="20" y1="4" x2="20" y2="60" />
      <line x1="4" y1="14" x2="20" y2="14" />
      <line x1="4" y1="28" x2="20" y2="28" />
      <line x1="4" y1="42" x2="20" y2="42" />
      <line x1="4" y1="56" x2="20" y2="56" />
    </svg>
  );
}

function SpeechBubble({ text, accent = false }: { text: string; accent?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 4 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`absolute bottom-full right-0 z-30 mb-2 w-52 rounded-2xl border px-3 py-2.5 text-xs font-medium leading-snug shadow-xl ${
        accent
          ? "border-accent/30 bg-neutral-900 text-accent"
          : "border-white/15 bg-neutral-900 text-foreground"
      }`}
    >
      {text}
      <span
        className={`absolute -bottom-1.5 right-8 h-3 w-3 rotate-45 border-r border-b ${
          accent ? "border-accent/30 bg-neutral-900" : "border-white/15 bg-neutral-900"
        }`}
      />
    </motion.div>
  );
}

function TopPulleySystem({ phase }: { phase: Phase }) {
  const visible = phase === "reacting" || phase === "building" || phase === "done" || phase === "leaving";
  const pulling = phase === "building";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: phase === "leaving" ? 0 : 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute inset-x-0 top-0 z-[8] h-32"
        >
          <div className="absolute inset-x-5 top-3 h-2.5 rounded-full bg-gradient-to-r from-amber-950/70 via-amber-700/75 to-amber-950/70" />

          {ROPE_ANCHORS.map((left, index) => (
            <div
              key={left}
              className="absolute top-0 h-full"
              style={{ left: `${left}%`, transform: "translateX(-50%)" }}
            >
              <motion.div
                animate={{ rotate: pulling ? 360 : 0 }}
                transition={{
                  duration: 0.85,
                  repeat: pulling ? Infinity : 0,
                  ease: "linear",
                  delay: index * 0.05,
                }}
                className="absolute top-2 left-1/2 h-7 w-7 -translate-x-1/2 rounded-full border-2 border-amber-200/60 bg-neutral-900"
              />
              <div className="absolute top-9 left-1/2 h-20 w-px -translate-x-1/2 bg-amber-200/45" />
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MinionCrew({ phase }: { phase: Phase }) {
  const showLeader = phase !== "idle" && phase !== "falling";
  const showWorkers =
    phase === "reacting" || phase === "building" || phase === "done" || phase === "leaving";
  const exiting = phase === "leaving";

  const exitTransition = {
    duration: PHASE_MS.leaving / 1000,
    times: [0, 0.3, 0.36, 1],
    ease: "easeInOut" as const,
  };

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32">
      {showWorkers && (
        <>
          <motion.div
            initial={{ x: -180, opacity: 0 }}
            animate={
              exiting
                ? { x: [0, -120, -120, 400], opacity: [1, 1, 1, 0], y: 0 }
                : { x: 0, opacity: 1, y: phase === "done" ? [0, -6, 0] : 0 }
            }
            transition={
              exiting
                ? exitTransition
                : phase === "done"
                  ? { y: { duration: 0.45, repeat: Infinity, ease: "easeInOut" } }
                  : { type: "spring", stiffness: 260, damping: 20, delay: 0.3 }
            }
            className="absolute bottom-1 left-[8%] flex items-end gap-1"
          >
            <Ladder className="h-16 w-7 text-amber-700/90" />
            <MinionCharacter variant="stuart" scale={0.9} />
          </motion.div>

          <motion.div
            initial={{ x: -160, opacity: 0 }}
            animate={
              exiting
                ? { x: [0, -100, -100, 380], opacity: [1, 1, 1, 0] }
                : { x: 0, opacity: 1 }
            }
            transition={
              exiting
                ? { ...exitTransition, delay: 0.05 }
                : { type: "spring", stiffness: 260, damping: 20, delay: 0.45 }
            }
            className="absolute bottom-1 left-[32%] flex items-end"
          >
            <MinionCharacter variant="kevin" scale={0.88} />
          </motion.div>
        </>
      )}

      {showLeader && (
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={
            exiting
              ? { x: [0, -140, -140, 460], opacity: [1, 1, 1, 0], y: 0 }
              : { x: 0, opacity: 1, y: phase === "done" ? [0, -8, 0] : 0 }
          }
          transition={
            exiting
              ? exitTransition
              : phase === "done"
                ? { y: { duration: 0.45, repeat: Infinity, ease: "easeInOut" } }
                : { type: "spring", stiffness: 240, damping: 18 }
          }
          className="absolute bottom-1 right-[6%] flex items-end"
        >
          <div className="relative">
            <AnimatePresence mode="wait">
              {phase === "reacting" && <SpeechBubble key="react" text={LEADER_LINE} />}
              {phase === "done" && <SpeechBubble key="done" text={DONE_LINE} accent />}
              {phase === "leaving" && <SpeechBubble key="drag" text={DRAG_LINE} />}
            </AnimatePresence>
            <MinionCharacter variant="bob" scale={0.96} flip />
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default function AboutInteractiveSummary() {
  const [phase, setPhase] = useState<Phase>("idle");
  const reduceMotion = useReducedMotion();
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const paragraphs = useMemo(
    () =>
      [asNonEmptyString(personal?.summary), SECOND_PARAGRAPH].filter(
        (paragraph) => paragraph.length > 0,
      ),
    [],
  );
  const words = useMemo(() => buildWordTokens(paragraphs), [paragraphs]);

  const paragraphWordCounts = useMemo(
    () => paragraphs.map((paragraph) => splitWords(paragraph).length),
    [paragraphs],
  );

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, ms: number) => {
    timersRef.current.push(setTimeout(fn, ms));
  }, []);

  const handleClick = useCallback(() => {
    if (phase !== "idle") return;
    if (reduceMotion) return;
    setPhase("falling");
  }, [phase, reduceMotion]);

  useEffect(() => {
    clearTimers();
    if (phase === "idle") return;

    const next: Partial<Record<Phase, Phase>> = {
      falling: "reacting",
      reacting: "building",
      building: "done",
      done: "leaving",
      leaving: "idle",
    };

    const delay = phase === "leaving" ? PHASE_MS.leaving : PHASE_MS[phase];
    const target = next[phase];
    if (target) {
      schedule(() => setPhase(target), delay);
    }

    return clearTimers;
  }, [phase, clearTimers, schedule]);

  const isAnimating = phase !== "idle";
  const isFallen = phase === "falling" || phase === "reacting";
  const isRising = phase === "building";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleClick();
        }
      }}
      aria-label="About summary. Click for a surprise animation."
      className={`relative rounded-xl transition-colors duration-300 ${
        isAnimating ? "min-h-[22rem] pb-32" : "min-h-0"
      } ${phase === "idle" ? "cursor-pointer hover:bg-white/[0.03]" : "cursor-wait"}`}
    >
      {isAnimating && (
        <>
          <TopPulleySystem phase={phase} />
          <MinionCrew phase={phase} />
        </>
      )}

      <div
        className={`relative z-10 text-lg leading-relaxed text-muted ${
          isAnimating ? "pt-10" : ""
        }`}
      >
        {paragraphs.length === 0 ? (
          <p className="text-muted">Summary coming soon.</p>
        ) : (
          paragraphs.map((paragraph, paragraphIndex) => {
          const start = paragraphWordCounts
            .slice(0, paragraphIndex)
            .reduce((total, count) => total + count, 0);
          const paragraphWords = words.slice(start, start + paragraphWordCounts[paragraphIndex]);

          return (
            <p
              key={paragraphIndex}
              className={`flex flex-wrap gap-x-1.5 gap-y-1 ${paragraphIndex > 0 ? "mt-4" : ""}`}
            >
              {paragraphWords.map((word, index) => {
                const globalIndex = start + index;

                let animateProps: { y: number; x: number; rotate: number; opacity: number };
                let transitionProps: object = { duration: 0 };

                if (isFallen) {
                  animateProps = {
                    y: word.fallY,
                    x: word.fallX,
                    rotate: word.rotate,
                    opacity: 1,
                  };
                  if (phase === "falling") {
                    transitionProps = {
                      type: "tween",
                      duration: 0.5,
                      delay: word.delay,
                      ease: [0.4, 0, 0.75, 1],
                    };
                  }
                } else if (isRising) {
                  animateProps = { y: 0, x: 0, rotate: 0, opacity: 1 };
                  transitionProps = {
                    type: "spring",
                    stiffness: 320,
                    damping: 24,
                    delay: globalIndex * 0.02,
                  };
                } else {
                  animateProps = { y: 0, x: 0, rotate: 0, opacity: 1 };
                }

                return (
                  <motion.span
                    key={word.id}
                    className={WORD_CLASS}
                    initial={false}
                    animate={animateProps}
                    transition={transitionProps}
                  >
                    {word.text}
                  </motion.span>
                );
              })}
            </p>
          );
        })
        )}
      </div>

      {phase === "idle" && !reduceMotion && (
        <p className="mt-3 text-xs text-muted/60">Click for a surprise</p>
      )}
    </div>
  );
}
