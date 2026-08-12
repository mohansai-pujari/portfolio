"use client";

import { motion } from "framer-motion";
import { Camera, Globe, GraduationCap, Plane, Sparkles, Users } from "lucide-react";
import { InstagramIcon } from "./icons/SocialIcons";
import { collegeActivities, education } from "@/data/portfolio";
import { asArray, asNonEmptyString, isValidUrl } from "@/lib/safe-data";

const activityIconMap = [Plane, Users, Camera, Sparkles];

function LinkIcon({ label, href }: { label: string; href: string }) {
  const normalizedLabel = label.toLowerCase();

  if (normalizedLabel.includes("instagram") || href.includes("instagram.com")) {
    return <InstagramIcon size={14} />;
  }

  return <Globe size={14} strokeWidth={2.25} />;
}

export default function Education() {
  return (
    <section id="education" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label mb-3">Education</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Academic background &amp;{" "}
            <span className="gradient-text">campus life</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass card-hover mt-12 max-w-3xl rounded-2xl p-8"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-secondary/10">
              <GraduationCap size={20} className="text-accent-secondary" />
            </div>
            <h3 className="text-lg font-bold">Degree</h3>
          </div>
          <div className="mt-6">
            <p className="text-xl font-semibold">
              {isValidUrl(education?.institutionUrl) ? (
                <a
                  href={education.institutionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-accent"
                >
                  {asNonEmptyString(education?.institution, "Institution")}
                </a>
              ) : (
                asNonEmptyString(education?.institution, "Institution")
              )}
            </p>
            {(education?.degree || education?.field) && (
              <p className="mt-2 text-muted">
                {[education?.degree, education?.field && `in ${education.field}`]
                  .filter(Boolean)
                  .join(" ")}
              </p>
            )}
            <div className="mt-4 flex flex-wrap gap-4 font-mono text-sm">
              {education?.period && <span className="text-accent">{education.period}</span>}
              {education?.cgpa && <span className="text-muted">CGPA: {education.cgpa}</span>}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-14"
        >
          <h3 className="text-lg font-bold">Clubs &amp; activities — beyond academics</h3>
        </motion.div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {asArray(collegeActivities).map((activity, i) => {
            const Icon = activityIconMap[i] ?? Users;
            const roles = asArray(activity?.roles);
            const links = asArray(activity?.links).filter(
              (link) =>
                isValidUrl(link?.href) &&
                typeof link?.label === "string" &&
                link.label.trim().length > 0,
            );
            const org = asNonEmptyString(activity?.org, "Activity");

            return (
              <motion.div
                key={`${org}-${i}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass card-hover flex flex-col rounded-2xl p-6 sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                      <Icon size={20} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold">{org}</h3>
                      {activity?.subtitle && (
                        <p className="text-sm text-accent-secondary">{activity.subtitle}</p>
                      )}
                    </div>
                  </div>
                  {activity?.period && (
                    <span className="shrink-0 rounded-lg bg-white/5 px-2.5 py-1 font-mono text-[10px] text-accent sm:text-xs">
                      {activity.period}
                    </span>
                  )}
                </div>

                {roles.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {roles.map((role) => (
                      <span
                        key={role}
                        className="rounded-md bg-white/5 px-2.5 py-1 font-mono text-[11px] text-muted ring-1 ring-white/5"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                )}

                {activity?.description && (
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                    {activity.description}
                  </p>
                )}

                {links.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        title={link.label}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-accent ring-1 ring-white/5 transition hover:bg-accent/10 hover:ring-accent/20"
                      >
                        <LinkIcon label={link.label} href={link.href} />
                      </a>
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
