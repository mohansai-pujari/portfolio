"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Headset } from "lucide-react";
import { AnimatedStatShell, type Stat } from "./StatCardShell";

type FlyingTicket = {
  id: number;
  label: string;
  from: "left" | "right";
  arc: number;
  duration: number;
};

const TICKET_LABELS = ["#4821", "Open", "SLA ✓", "Resolved", "#9104", "Escalated"];

function createTicket(id: number): FlyingTicket {
  return {
    id,
    label: TICKET_LABELS[Math.floor(Math.random() * TICKET_LABELS.length)],
    from: Math.random() > 0.5 ? "left" : "right",
    arc: -(10 + Math.random() * 14),
    duration: 1 + Math.random() * 0.5,
  };
};

function SupportAgent({
  side,
  label,
  throwing,
}: {
  side: "left" | "right";
  label: string;
  throwing: boolean;
}) {
  const isLeft = side === "left";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 10 }}
      animate={{ opacity: 1, scale: throwing ? 1.06 : 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, y: 10 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
      className={`absolute bottom-0 flex flex-col items-center gap-1 ${
        isLeft ? "left-1.5 sm:left-2" : "right-1.5 sm:right-2"
      }`}
    >
      <div className="relative">
        {throwing && (
          <motion.span
            className="absolute inset-0 rounded-full ring-2 ring-accent/50"
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        )}
        <div
          className={`glass flex h-9 w-9 items-center justify-center rounded-full ring-1 transition-shadow duration-300 sm:h-10 sm:w-10 ${
            throwing
              ? "ring-accent/50 shadow-lg shadow-accent/25"
              : "ring-accent/20"
          }`}
        >
          <Headset size={16} className="text-accent/90" />
        </div>
      </div>
      <span className="font-mono text-[8px] tracking-widest text-muted uppercase sm:text-[9px]">
        {label}
      </span>
    </motion.div>
  );
}

export default function TicketStatCard({
  stat,
  index,
}: {
  stat: Stat;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [tickets, setTickets] = useState<FlyingTicket[]>([]);
  const [throwingSide, setThrowingSide] = useState<"left" | "right" | null>(null);
  const idRef = useRef(0);
  const hoveredRef = useRef(false);

  useEffect(() => {
    hoveredRef.current = hovered;
    if (!hovered) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const throwTicket = () => {
      if (!hoveredRef.current) return;

      const ticket = createTicket(idRef.current++);
      setThrowingSide(ticket.from);
      setTickets((prev) => [...prev, ticket]);

      setTimeout(() => setThrowingSide(null), 280);

      setTimeout(() => {
        setTickets((prev) => prev.filter((t) => t.id !== ticket.id));
      }, ticket.duration * 1000 + 100);

      timeoutId = setTimeout(throwTicket, 750 + Math.random() * 550);
    };

    throwTicket();
    return () => clearTimeout(timeoutId);
  }, [hovered]);

  const handleLeave = () => {
    hoveredRef.current = false;
    setHovered(false);
    setTickets([]);
    setThrowingSide(null);
  };

  return (
    <AnimatedStatShell
      stat={stat}
      index={index}
      variant="green"
      hovered={hovered}
      onEnter={() => setHovered(true)}
      onLeave={handleLeave}
      topOverlay={
        <AnimatePresence>
          {hovered && (
            <div className="relative h-full w-full">
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-6 left-[18%] right-[18%] border-t border-dashed border-accent/25"
              />

              <SupportAgent side="left" label="L1" throwing={throwingSide === "left"} />
              <SupportAgent side="right" label="L2" throwing={throwingSide === "right"} />

              <AnimatePresence>
                {tickets.map((ticket) => {
                  const fromLeft = ticket.from === "left";
                  return (
                    <motion.span
                      key={ticket.id}
                      initial={{
                        opacity: 0,
                        scale: 0.55,
                        left: fromLeft ? "20%" : "68%",
                        top: 22,
                        rotate: fromLeft ? -10 : 10,
                      }}
                      animate={{
                        opacity: [0, 1, 1, 0.9, 0],
                        scale: [0.55, 1.05, 1, 0.95, 0.6],
                        left: fromLeft ? "68%" : "20%",
                        top: [22, 22 + ticket.arc, 22 + ticket.arc * 0.35, 22],
                        rotate: fromLeft ? 10 : -10,
                      }}
                      exit={{ opacity: 0, scale: 0.4 }}
                      transition={{
                        duration: ticket.duration,
                        ease: [0.33, 0.66, 0.45, 1],
                      }}
                      className="absolute z-10 whitespace-nowrap rounded-md border border-accent/40 bg-[#050508]/95 px-2.5 py-1 font-mono text-[10px] font-medium text-accent shadow-md shadow-accent/25 sm:text-[11px]"
                    >
                      {ticket.label}
                    </motion.span>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </AnimatePresence>
      }
    />
  );
}
