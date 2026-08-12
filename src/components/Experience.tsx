"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { experience } from "@/data/portfolio";
import { asArray, asNonEmptyString, asString } from "@/lib/safe-data";

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label mb-3">Experience</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Where I&apos;ve <span className="gradient-text">built &amp; shipped</span>
          </h2>
        </motion.div>

        <div className="relative mt-16">
          <div className="timeline-line absolute top-0 left-[19px] hidden h-full w-0.5 md:block" />

          <div className="space-y-12">
            {asArray(experience).map((job, i) => (
              <motion.div
                key={`${asString(job?.company, "role")}-${i}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative flex gap-6 md:gap-10"
              >
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 ring-2 ring-accent/30">
                  <Briefcase size={18} className="text-accent" />
                </div>

                <div className="glass card-hover flex-1 rounded-2xl p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold">{asNonEmptyString(job?.role, "Role")}</h3>
                      <p className="mt-1 text-accent-secondary">
                        {asNonEmptyString(job?.company, "Company")}
                      </p>
                      {job?.domain && (
                        <p className="mt-1 font-mono text-xs text-accent/80">{job.domain}</p>
                      )}
                      {job?.location && (
                        <p className="mt-1 font-mono text-xs text-muted">{job.location}</p>
                      )}
                    </div>
                    {job?.period && (
                      <span className="glass rounded-lg px-3 py-1.5 font-mono text-xs text-accent">
                        {job.period}
                      </span>
                    )}
                  </div>

                  {asArray(job?.highlights).length > 0 && (
                    <ul className="mt-6 space-y-3">
                      {asArray(job?.highlights).map((point, pointIndex) => (
                        <li
                          key={`${pointIndex}-${asString(point).slice(0, 40)}`}
                          className="flex gap-3 text-sm leading-relaxed text-muted"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          {asString(point)}
                        </li>
                      ))}
                    </ul>
                  )}

                  {asArray(job?.tech).length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {asArray(job?.tech).map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-white/5 px-2.5 py-1 font-mono text-[11px] text-muted ring-1 ring-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
