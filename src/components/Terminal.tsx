"use client";

import { useEffect, useMemo, useState } from "react";
import { terminalCommands } from "@/data/portfolio";
import { normalizeTerminalCommands } from "@/lib/safe-data";

const DEFAULT_COMMANDS = normalizeTerminalCommands([
  { cmd: "whoami", output: "mohan-sai-pujari" },
  { cmd: "echo $PASSION", output: "Building systems that scale." },
]);

export default function Terminal() {
  const commands = useMemo(
    () => normalizeTerminalCommands(terminalCommands),
    [],
  );
  const safeCommands = commands.length > 0 ? commands : DEFAULT_COMMANDS;

  const [visibleLines, setVisibleLines] = useState<
    { type: "input" | "output"; text: string }[]
  >([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<"typing-cmd" | "show-output" | "pause">(
    "typing-cmd"
  );

  useEffect(() => {
    if (currentIndex >= safeCommands.length) {
      const timer = setTimeout(() => {
        setVisibleLines([]);
        setCurrentIndex(0);
        setCharIndex(0);
        setPhase("typing-cmd");
      }, 4000);
      return () => clearTimeout(timer);
    }

    const cmd = safeCommands[currentIndex];
    if (!cmd) return;

    if (phase === "typing-cmd") {
      if (charIndex < cmd.cmd.length) {
        const timer = setTimeout(() => setCharIndex((c) => c + 1), 50);
        return () => clearTimeout(timer);
      }
      setVisibleLines((prev) => [
        ...prev,
        { type: "input", text: `$ ${cmd.cmd}` },
      ]);
      setCharIndex(0);
      setPhase("show-output");
      return;
    }

    if (phase === "show-output") {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => [
          ...prev,
          { type: "output", text: cmd.output },
        ]);
        setCurrentIndex((i) => i + 1);
        setPhase("pause");
      }, 300);
      return () => clearTimeout(timer);
    }

    if (phase === "pause") {
      const timer = setTimeout(() => setPhase("typing-cmd"), 600);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, charIndex, phase, safeCommands]);

  const currentCmd =
    currentIndex < safeCommands.length
      ? (safeCommands[currentIndex]?.cmd ?? "").slice(0, charIndex)
      : "";

  return (
    <div className="glass flex min-h-[252px] flex-col overflow-hidden rounded-2xl ring-1 ring-white/10 sm:min-h-[276px]">
      <div className="flex items-center gap-2 border-b border-white/5 px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
        <span className="ml-1.5 font-mono text-[11px] text-muted">~/portfolio</span>
      </div>
      <div className="flex min-h-[10.5rem] flex-1 flex-col justify-start p-3 font-mono text-xs leading-relaxed sm:min-h-[11.5rem] sm:p-4 sm:text-sm">
        {visibleLines.map((line, i) => (
          <div
            key={i}
            className={
              line.type === "input" ? "text-accent-secondary" : "text-muted"
            }
          >
            {line.text}
          </div>
        ))}
        {currentIndex < safeCommands.length && phase === "typing-cmd" && (
          <div className="text-accent-secondary">
            $ {currentCmd}
            <span className="cursor-blink ml-0.5 inline-block h-3.5 w-1.5 bg-accent align-middle" />
          </div>
        )}
      </div>
    </div>
  );
}
