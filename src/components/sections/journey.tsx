import { motion, useReducedMotion } from "framer-motion";

import { SectionHeader } from "@/components/ui/section-header";
import { timeline } from "@/data/timeline";

export function JourneySection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="karma-path" className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: "easeOut" }}
        >
          <SectionHeader
            eyebrow="KarmaPath"
            title="A journey shaped by systems, craft, and curiosity."
            description="A timeline of learning, building, and growing through product work, engineering discipline, and real-world delivery."
            align="center"
          />
        </motion.div>

        <div className="relative mt-12 before:absolute before:left-4 before:top-0 before:h-full before:w-px before:bg-border md:before:left-1/2">
          {timeline.map((item, index) => (
            <motion.article
              key={item.id}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.45,
                delay: prefersReducedMotion ? 0 : index * 0.08,
                ease: "easeOut",
              }}
              className="relative mb-8 last:mb-0 md:mb-10"
            >
              <div className="flex items-center gap-4 md:justify-center">
                <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-primary bg-background">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                </div>
                <div className="w-full max-w-xl rounded-[1.5rem] border border-border bg-card/70 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.08)] md:w-[calc(50%-2rem)] md:max-w-none">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs uppercase tracking-[0.24em] text-primary">
                      {item.year}
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">
                    {item.organisation}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-background/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
