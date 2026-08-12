"use client";

import { motion } from "framer-motion";
import { Cloud, Code, Cpu, Database, Layers } from "lucide-react";
import { skillCategories } from "@/data/portfolio";
import { asArray } from "@/lib/safe-data";

const iconMap = {
  code: Code,
  layers: Layers,
  database: Database,
  cloud: Cloud,
  cpu: Cpu,
};

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label mb-3">Skills</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            My technical <span className="gradient-text">toolkit</span>
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {asArray(skillCategories).map((category, i) => {
            const Icon = iconMap[category?.icon as keyof typeof iconMap] ?? Code;
            const skills = asArray(category?.skills);
            if (!category?.title && skills.length === 0) return null;

            return (
              <motion.div
                key={`${category?.title ?? "category"}-${i}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`glass card-hover rounded-2xl p-6 ${
                  i === 0 ? "sm:col-span-2 sm:p-8" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                    <Icon size={20} className="text-accent" />
                  </div>
                  <h3 className="font-bold">{category?.title ?? "Skills"}</h3>
                </div>
                {skills.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg bg-white/5 px-3 py-1.5 font-mono text-xs text-foreground/80 ring-1 ring-white/5 transition hover:bg-accent/10 hover:ring-accent/20"
                    >
                      {skill}
                    </span>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
