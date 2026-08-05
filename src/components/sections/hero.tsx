import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

const stats = [
  { value: "6+", label: "Years building" },
  { value: "18", label: "Products shipped" },
  { value: "∞", label: "Curiosity" },
];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="mahadrishti"
      className="relative isolate overflow-hidden px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.18),_transparent_30%)]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: "easeOut" }}
          className="mb-8 flex flex-wrap items-center gap-3"
        >
          <Badge variant="default">{siteConfig.availability}</Badge>
          <Badge variant="outline">{siteConfig.mantra}</Badge>
        </motion.div>

        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.7,
              ease: "easeOut",
              delay: shouldReduceMotion ? 0 : 0.08,
            }}
          >
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.28em] text-primary">
              {siteConfig.role}
            </p>

            <h1 className="max-w-3xl text-4xl font-black tracking-[-0.06em] text-foreground sm:text-5xl lg:text-7xl">
              Building elegant software with calm intent.
            </h1>

            <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
              {siteConfig.tagline}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-6">
                <a href="#srijan">
                  View work
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>

              <Button asChild variant="outline" size="lg" className="rounded-full px-6">
                <a href="mailto:hello@yashsharma.dev">Let&apos;s talk</a>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-8 text-sm text-muted-foreground">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div>{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.8,
              ease: "easeOut",
              delay: shouldReduceMotion ? 0 : 0.12,
            }}
            className="relative"
          >
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-primary/10 blur-3xl" />
            <div className="rounded-[2rem] border border-border bg-card/80 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.22)] backdrop-blur-md sm:p-6">
              <div className="rounded-[1.6rem] border border-border bg-gradient-to-br from-primary/15 via-background to-violet-500/10 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-lg font-bold text-primary">
                      {siteConfig.monogram}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{siteConfig.name}</div>
                      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {siteConfig.location}
                      </div>
                    </div>
                  </div>
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>

                <div className="rounded-[1.4rem] border border-border bg-background/70 p-5">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    <span>Current focus</span>
                    <span>Full-stack</span>
                  </div>

                  <div className="mt-5 space-y-4">
                    <div className="rounded-2xl border border-border bg-card p-4">
                      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        System design
                      </div>
                      <div className="mt-2 text-xl font-semibold text-foreground">
                        Thoughtful interfaces
                      </div>
                    </div>

                    <div className="rounded-2xl border border-border bg-card p-4">
                      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Engineering
                      </div>
                      <div className="mt-2 text-xl font-semibold text-foreground">
                        Reusable, resilient product code
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 flex justify-center lg:mt-16">
          <a
            href="#vidya"
            className="inline-flex flex-col items-center gap-2 text-sm uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <span>Scroll</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
