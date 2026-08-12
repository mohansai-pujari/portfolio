"use client";

import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { GitHubIcon } from "./icons/SocialIcons";
import { projects } from "@/data/portfolio";
import { asArray, asNonEmptyString, asString, isValidUrl } from "@/lib/safe-data";

export default function Projects() {
  const projectList = asArray(projects);
  const featured = projectList.find((p) => p?.featured);
  const others = projectList.filter((p) => !p?.featured);

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label mb-3">Projects</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Things I&apos;ve <span className="gradient-text">built</span>
          </h2>
        </motion.div>

        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass card-hover mt-12 overflow-hidden rounded-2xl ring-1 ring-accent/20"
          >
            <div className="grid lg:grid-cols-2">
              <div className="relative flex min-h-[200px] items-center justify-center bg-gradient-to-br from-accent/10 via-accent-secondary/5 to-accent-violet/10 p-8">
                <div className="text-center">
                  <Star className="mx-auto mb-3 text-accent" size={32} />
                  <span className="font-mono text-xs tracking-widest text-accent uppercase">
                    Featured Project
                  </span>
                </div>
              </div>
              <div className="p-8">
                {featured.period && (
                  <span className="font-mono text-xs text-muted">{featured.period}</span>
                )}
                <h3 className="mt-2 text-2xl font-bold">
                  {asNonEmptyString(featured.title, "Featured project")}
                </h3>
                {featured.description && (
                  <p className="mt-4 leading-relaxed text-muted">{featured.description}</p>
                )}
                {asArray(featured.tech).length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {asArray(featured.tech).map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-accent/10 px-2.5 py-1 font-mono text-[11px] text-accent"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((project, i) => (
            <motion.div
              key={`${asString(project?.title, "project")}-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass card-hover group flex flex-col rounded-2xl p-6"
            >
              <h3 className="text-lg font-bold">
                {asNonEmptyString(project?.title, "Project")}
              </h3>
              {project?.description && (
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
              )}
              {asArray(project?.tech).length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {asArray(project?.tech).map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[10px] text-muted"
                  >
                    {t}
                  </span>
                  ))}
                </div>
              )}
              {isValidUrl(project?.github) && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-accent transition group-hover:gap-3"
                >
                  <GitHubIcon size={14} />
                  View on GitHub
                  <ExternalLink size={12} className="opacity-0 transition group-hover:opacity-100" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
