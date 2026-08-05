import { motion, useReducedMotion } from "framer-motion";
import { Code2, Languages, Sparkles, Workflow } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";
import { interpersonalTags, skillGroups, spokenLanguages } from "@/data/skills";

const icons = [Code2, Languages, Workflow, Sparkles];

function SkillLevelPill({ level }: { level: "core" | "proficient" | "familiar" }) {
  const tone = {
    core: "bg-primary/15 text-primary",
    proficient: "bg-violet-500/15 text-violet-300",
    familiar: "bg-slate-500/15 text-slate-300",
  };

  return (
    <span
      className={`rounded-full px-2 py-1 text-[10px] font-medium uppercase tracking-[0.18em] ${tone[level]}`}
    >
      {level}
    </span>
  );
}

export function SkillsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="vidya" className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: "easeOut" }}
        >
          <SectionHeader
            eyebrow="Vidya"
            title="Skills that translate into product value."
            description="I build across the stack with a bias toward clarity, maintainability, and systems that age well under real use."
            align="center"
          />
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {skillGroups.map((group, index) => {
            const Icon = icons[index % icons.length];

            return (
              <motion.article
                key={group.id}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.45,
                  delay: prefersReducedMotion ? 0 : index * 0.06,
                  ease: "easeOut",
                }}
                className="rounded-[1.75rem] border border-border bg-card/70 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.08)] backdrop-blur-sm"
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                        {group.sanskrit}
                      </p>
                      <h3 className="text-xl font-semibold text-foreground">{group.title}</h3>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-2 text-sm text-foreground"
                    >
                      <span>{skill.name}</span>
                      <SkillLevelPill level={skill.level} />
                    </div>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: "easeOut" }}
            className="rounded-[1.75rem] border border-border bg-card/70 p-6"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Languages</p>
            <div className="mt-5 space-y-4">
              {spokenLanguages.map((language) => (
                <div
                  key={language.name}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-background/70 p-3"
                >
                  <div>
                    <div className="font-medium text-foreground">{language.name}</div>
                    <div className="text-sm text-muted-foreground">{language.script}</div>
                  </div>
                  <Badge variant="outline">{language.proficiency}</Badge>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.5,
              delay: prefersReducedMotion ? 0 : 0.08,
              ease: "easeOut",
            }}
            className="rounded-[1.75rem] border border-border bg-card/70 p-6"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Interpersonal strengths
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {interpersonalTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-background/70 px-3 py-2 text-sm text-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
