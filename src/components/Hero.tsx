"use client";

import { motion } from "framer-motion";
import { personal, stats } from "@/data/portfolio";
import { asArray, asNonEmptyString } from "@/lib/safe-data";
import Terminal from "./Terminal";
import RotatingHighlight from "./RotatingHighlight";
import ExperienceStatCard from "./ExperienceStatCard";
import AwardStatCard from "./AwardStatCard";
import PacketStatCard from "./stats/PacketStatCard";
import TicketStatCard from "./stats/TicketStatCard";
import LatencyStatCard from "./stats/LatencyStatCard";

function getStatCard(stat: (typeof stats)[number] | undefined, index: number) {
  if (!stat?.label || !stat?.value) return null;

  if (stat.label === "Years of Experience") {
    return <ExperienceStatCard key={`${stat.label}-${index}`} stat={stat} index={index} />;
  }
  if (stat.value === "Beyond the Call of Duty") {
    return <AwardStatCard key={`${stat.label}-${index}`} stat={stat} index={index} />;
  }
  if (stat.label === "IoT Events / Day") {
    return <PacketStatCard key={`${stat.label}-${index}`} stat={stat} index={index} />;
  }
  if (stat.label === "Tickets / Day") {
    return <TicketStatCard key={`${stat.label}-${index}`} stat={stat} index={index} />;
  }
  if (stat.label === "Latency Reduction") {
    return <LatencyStatCard key={`${stat.label}-${index}`} stat={stat} index={index} />;
  }
  return null;
}

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center px-6 pt-24 pb-16">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:py-4"
          >
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              Hi, I&apos;m{" "}
              <span className="gradient-text">{asNonEmptyString(personal?.firstName, "there")}</span>
              <br />
              <span className="text-foreground/90">I build systems that scale.</span>
            </h1>
            <RotatingHighlight />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative lg:py-4"
          >
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-accent/10 via-transparent to-accent-secondary/10 blur-2xl" />
            <div className="relative">
              <Terminal />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-12 grid grid-cols-2 items-stretch gap-3 sm:grid-cols-3 sm:gap-4 lg:mt-14 lg:grid-cols-5"
        >
          {asArray(stats).map((stat, i) => getStatCard(stat, i))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#about" aria-label="Scroll to about">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-2"
          >
            <div className="h-2 w-1 rounded-full bg-accent" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
