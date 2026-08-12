"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { personal } from "@/data/portfolio";
import { asNonEmptyString } from "@/lib/safe-data";
import AboutInteractiveSummary from "./AboutInteractiveSummary";

export default function About() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label mb-3">About Me</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Turning complex problems into{" "}
            <span className="gradient-text">elegant systems</span>
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass card-hover rounded-2xl p-8 lg:col-span-3"
          >
            <AboutInteractiveSummary />
              {personal?.location && (
                <div className="mt-6 flex items-center gap-2 font-mono text-sm text-accent-secondary">
                  <MapPin size={16} />
                  {personal.location}
                </div>
              )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass card-hover flex flex-col justify-center rounded-2xl p-8 lg:col-span-2"
          >
            <div className="font-mono text-xs tracking-widest text-muted uppercase">
              Currently
            </div>
            <div className="mt-3 text-2xl font-bold">
              {asNonEmptyString(personal?.role, "Software Engineer")}
            </div>
            {personal?.company && <div className="mt-2 text-accent">{personal.company}</div>}
            <div className="mt-6 space-y-3 font-mono text-sm">
              {personal?.domain && (
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-muted">Domain</span>
                  <span>{personal.domain}</span>
                </div>
              )}
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-muted">Focus</span>
                <span>Backend / Distributed Systems</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-muted">Stack</span>
                <span>Go · Java · Kafka</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Open to</span>
                <span className="text-accent">Opportunities</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
