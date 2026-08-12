"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award } from "lucide-react";
import { professionalAchievements } from "@/data/portfolio";
import { asArray, asNonEmptyString, asString } from "@/lib/safe-data";

type Achievement = (typeof professionalAchievements)[number];

function AchievementCard({ item, index }: { item: Achievement; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.06, y: -10 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onHoverStart={() => setExpanded(true)}
      onHoverEnd={() => setExpanded(false)}
      onFocus={() => setExpanded(true)}
      onBlur={() => setExpanded(false)}
      tabIndex={0}
      className={`glass relative rounded-2xl p-6 outline-none transition-shadow sm:p-7 ${
        expanded
          ? "z-20 border-accent/30 shadow-2xl shadow-accent/10 ring-1 ring-accent/30"
          : "z-0"
      }`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-violet/10">
        <Award size={20} className="text-accent-violet" />
      </div>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-2">
        <h3 className="font-bold leading-snug">{asNonEmptyString(item?.title, "Achievement")}</h3>
        {item.date && (
          <span className="shrink-0 font-mono text-xs text-accent">{item.date}</span>
        )}
      </div>

      <p className="mt-2 text-sm font-medium text-accent-secondary">
        {asNonEmptyString(item?.org, "Organization")}
      </p>
      {item?.detail && (
        <p className="mt-3 text-sm leading-relaxed text-muted">{item.detail}</p>
      )}

      <AnimatePresence>
        {expanded && asArray(item?.expandedDetail).length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-4 border-t border-white/10 pt-4">
              <p className="font-mono text-[10px] tracking-widest text-accent uppercase">
                Highlights
              </p>
              <ul className="mt-3 space-y-2">
                {asArray(item?.expandedDetail).map((point, pointIndex) => (
                  <li
                    key={`${pointIndex}-${asString(point).slice(0, 40)}`}
                    className="flex gap-2 text-sm leading-relaxed text-muted"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {asString(point)}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!expanded && (
        <p className="mt-4 hidden font-mono text-[10px] tracking-wide text-muted/60 sm:block">
          Hover to learn more
        </p>
      )}
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label mb-3">Recognition</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Professional <span className="gradient-text">achievements</span>
          </h2>
        </motion.div>

        <div className="mt-10 grid items-start gap-4 overflow-visible sm:grid-cols-3">
          {asArray(professionalAchievements).map((item, i) => (
            <AchievementCard
              key={`${asString(item?.title, "achievement")}-${i}`}
              item={item}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
