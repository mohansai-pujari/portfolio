"use client";

import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Code2, Mail, MapPin, Phone, Send } from "lucide-react";
import { GitHubIcon, InstagramIcon, LinkedInIcon, WhatsAppIcon } from "./icons/SocialIcons";
import { personal } from "@/data/portfolio";
import { asNonEmptyString, asString, extractLinkedInHandle, isValidUrl } from "@/lib/safe-data";

const inputClassName =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-mono text-sm text-foreground outline-none transition placeholder:text-muted/60 focus:border-accent/40 focus:ring-1 focus:ring-accent/20";

export default function Contact() {
  const email = asNonEmptyString(personal?.email, "hello@example.com");
  const phone = asNonEmptyString(personal?.phone, "—");
  const location = asNonEmptyString(personal?.location, "—");
  const linkedinHandle = extractLinkedInHandle(personal?.links?.linkedin);

  const socialLinks = useMemo(
    () =>
      [
        { href: personal?.links?.github, icon: GitHubIcon, label: "GitHub" },
        { href: personal?.links?.linkedin, icon: LinkedInIcon, label: "LinkedIn" },
        { href: personal?.links?.instagram, icon: InstagramIcon, label: "Instagram" },
        { href: personal?.links?.leetcode, icon: Code2, label: "LeetCode" },
        {
          href: personal?.links?.email ?? (email ? `mailto:${email}` : undefined),
          icon: Mail,
          label: "Email",
        },
        { href: personal?.links?.whatsapp, icon: WhatsAppIcon, label: "WhatsApp" },
      ].filter((link) => isValidUrl(link.href)),
    [email],
  );
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { error?: string; success?: boolean };

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "", company: "" });
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again or email me directly.");
    }
  };

  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="section-label mb-3">Contact</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Get in <span className="gradient-text">touch</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Open to discussing backend engineering roles, interesting projects, or
            collaboration opportunities. Send a message or reach out directly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8 lg:p-10"
        >
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-accent-secondary/10 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">
            <div>
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <p className="mt-2 text-sm text-muted">
                Prefer a direct line? Email or call anytime.
              </p>

              <div className="mt-8 space-y-6">
                <a
                  href={personal?.links?.email ?? `mailto:${email}`}
                  className="group flex items-start gap-4 transition hover:text-accent"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition group-hover:bg-accent/15">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
                      Email
                    </p>
                    <p className="mt-1 text-sm font-medium break-all">{email}</p>
                  </div>
                </a>

                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="group flex items-start gap-4 transition hover:text-accent"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition group-hover:bg-accent/15">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
                      Phone
                    </p>
                    <p className="mt-1 text-sm font-medium">{phone}</p>
                  </div>
                </a>

                {isValidUrl(personal?.links?.linkedin) && (
                  <a
                    href={personal?.links?.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 transition hover:text-accent"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition group-hover:bg-accent/15">
                      <LinkedInIcon size={18} />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
                        LinkedIn
                      </p>
                      <p className="mt-1 text-sm font-medium">linkedin.com/in/{linkedinHandle}</p>
                    </div>
                  </a>
                )}

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
                      Location
                    </p>
                    <p className="mt-1 text-sm font-medium">{location}</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    aria-label={link.label}
                    className="glass flex h-11 w-11 items-center justify-center rounded-xl transition hover:border-accent/30 hover:text-accent"
                  >
                    <link.icon size={18} className="shrink-0" />
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 sm:p-6">
              <h3 className="text-lg font-semibold">Send a Message</h3>
              <p className="mt-2 text-sm text-muted">
                Share a note and I&apos;ll get back to you.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={(event) => setForm((prev) => ({ ...prev, company: event.target.value }))}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden
                />

                <div>
                  <label htmlFor="contact-name" className="mb-2 block font-mono text-xs text-muted">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                    placeholder="Your name"
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="mb-2 block font-mono text-xs text-muted">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                    placeholder="your@email.com"
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block font-mono text-xs text-muted"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, message: event.target.value }))
                    }
                    placeholder="What's on your mind?"
                    className={`${inputClassName} resize-none`}
                  />
                </div>

                {status === "success" && (
                  <p className="rounded-xl border border-accent/20 bg-accent/10 px-4 py-3 text-sm text-accent">
                    Message sent. Thanks for reaching out — I&apos;ll reply soon.
                  </p>
                )}

                {status === "error" && (
                  <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-mono text-sm font-medium text-black transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
