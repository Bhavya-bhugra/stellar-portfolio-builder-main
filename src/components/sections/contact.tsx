import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Download,
  Mail,
  MessageSquareText,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactConfig } from "@/config/contact";
import { siteConfig } from "@/config/site";
import { socialLinks } from "@/config/social";
import { useContactForm } from "@/hooks/use-contact-form";

export function ContactSection() {
  const prefersReducedMotion = useReducedMotion();
  const { form, errors, status, submitting, updateField, submit } = useContactForm();

  return (
    <section id="kriya" className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: "easeOut" }}
          className="text-center"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-primary">Kriya</p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Let&apos;s build something useful.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            I&apos;m open to product work, thoughtful collaborations, and the kind of engineering
            problems that need both precision and calm.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.aside
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="rounded-[1.75rem] border border-border bg-card/70 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Briefcase className="h-5 w-5" />
                </div>
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Availability
                </p>
              </div>
              <Badge
                variant="default"
                className="mt-5 rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.18em]"
              >
                {siteConfig.availability}
              </Badge>
              <div className="mt-5 space-y-3 text-sm text-muted-foreground">
                <p>Open to product engineering, frontend systems, and flexible consulting work.</p>
                <p>
                  Best for focused web apps, internal tools, and interface-heavy product builds.
                </p>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-border bg-card/70 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Sparkles className="h-5 w-5" />
                </div>
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Connect</p>
              </div>
              <div className="mt-5 space-y-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-background/70 px-3 py-2 text-sm text-foreground transition-colors hover:border-primary/50"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button asChild variant="outline" className="rounded-full">
                <a href={siteConfig.resumeUrl} target="_blank" rel="noreferrer">
                  <Download className="h-4 w-4" />
                  Resume
                </a>
              </Button>
              <Button asChild className="rounded-full">
                <a href={`mailto:${contactConfig.recipient}`}>
                  <Mail className="h-4 w-4" />
                  Hire Me
                </a>
              </Button>
            </div>
          </motion.aside>

          <motion.form
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: "easeOut" }}
            className="rounded-[1.75rem] border border-border bg-card/70 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.08)]"
            onSubmit={async (event) => {
              event.preventDefault();
              await submit();
            }}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MessageSquareText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Contact</p>
                <p className="font-medium text-foreground">Send a message</p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  placeholder="Your name"
                />
                {errors.name ? (
                  <p id="name-error" className="text-xs text-destructive">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  placeholder="you@example.com"
                />
                {errors.email ? (
                  <p id="email-error" className="text-xs text-destructive">
                    {errors.email}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={form.subject}
                onChange={(event) => updateField("subject", event.target.value)}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? "subject-error" : undefined}
                placeholder="Project enquiry"
              />
              {errors.subject ? (
                <p id="subject-error" className="text-xs text-destructive">
                  {errors.subject}
                </p>
              ) : null}
            </div>

            <div className="mt-5 space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={form.message}
                onChange={(event) => updateField("message", event.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                placeholder="Tell me a bit about your project, budget, and timeline."
                className="min-h-32"
              />
              {errors.message ? (
                <p id="message-error" className="text-xs text-destructive">
                  {errors.message}
                </p>
              ) : null}
            </div>

            <AnimatePresence>
              {status ? (
                <motion.div
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  role={status.type === "success" ? "status" : "alert"}
                  aria-live={status.type === "success" ? "polite" : "assertive"}
                  className={`mt-5 flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm ${
                    status.type === "success"
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                      : "border-destructive/40 bg-destructive/10 text-destructive"
                  }`}
                >
                  {status.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : null}
                  {status.message}
                </motion.div>
              ) : null}
            </AnimatePresence>

            <Button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full rounded-full sm:w-auto"
            >
              {submitting ? "Sending..." : "Send message"}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
