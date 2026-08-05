import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { projectFilters, projects } from "@/data/projects";
import type { Project, ProjectCategory } from "@/types";

const featuredProject = projects[0];

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      layout
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="group h-full rounded-[1.75rem] border border-border bg-card/70 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.08)] backdrop-blur-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-primary">{project.sanskrit}</p>
          <h3 className="mt-2 text-xl font-semibold text-foreground">{project.title}</h3>
        </div>
        <div className="rounded-full border border-border bg-background/80 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {project.year}
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-muted-foreground">{project.summary}</p>

      {project.highlight ? (
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          {project.highlight}
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <Badge
            key={`${project.id}-${tech}`}
            variant="outline"
            className="rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.16em]"
          >
            {tech}
          </Badge>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        {project.repoUrl ? (
          <Button asChild variant="outline" size="sm" className="rounded-full">
            <a href={project.repoUrl} target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </Button>
        ) : null}
        {project.liveUrl ? (
          <Button asChild size="sm" className="rounded-full">
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              Live Demo
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
        ) : null}
      </div>
    </motion.article>
  );
}

function ProjectSkeleton() {
  return (
    <div className="rounded-[1.75rem] border border-border bg-card/70 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.08)] backdrop-blur-sm">
      <div className="h-4 w-24 animate-pulse rounded-full bg-muted" />
      <div className="mt-3 h-6 w-2/3 animate-pulse rounded bg-muted" />
      <div className="mt-4 space-y-2">
        <div className="h-4 w-full animate-pulse rounded bg-muted" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
        <div className="h-4 w-4/6 animate-pulse rounded bg-muted" />
      </div>
      <div className="mt-5 flex gap-2">
        <div className="h-7 w-20 animate-pulse rounded-full bg-muted" />
        <div className="h-7 w-20 animate-pulse rounded-full bg-muted" />
      </div>
      <div className="mt-6 h-9 w-28 animate-pulse rounded-full bg-muted" />
    </div>
  );
}

export function ProjectsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | "all">("all");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="srijan" className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: "easeOut" }}
        >
          <SectionHeader
            eyebrow="Srijan"
            title="Projects shaped by utility and craft."
            description="Selected work across product, systems, and AI experiences — each built to solve a real problem with clarity and measurable impact."
            align="center"
          />
        </motion.div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {projectFilters.map((filter) => (
            <Button
              key={filter.id}
              type="button"
              variant={activeFilter === filter.id ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => setActiveFilter(filter.id)}
              aria-pressed={activeFilter === filter.id}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        <motion.div
          layout
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: "easeOut" }}
          className="mt-10"
        >
          <Card className="overflow-hidden border border-border bg-card/70 shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
            <CardHeader className="border-b border-border bg-gradient-to-r from-primary/10 via-background to-violet-500/10 pb-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-primary">
                    Featured project
                  </p>
                  <CardTitle className="mt-2 text-2xl font-semibold text-foreground">
                    {featuredProject.title}
                  </CardTitle>
                </div>
                <Badge
                  variant="outline"
                  className="w-fit rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em]"
                >
                  {featuredProject.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    {featuredProject.sanskrit}
                  </div>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">
                    {featuredProject.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {featuredProject.stack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.16em]"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-border bg-background/70 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-primary">Impact</p>
                  <p className="mt-3 text-2xl font-bold text-foreground">
                    {featuredProject.highlight}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {featuredProject.repoUrl ? (
                      <Button asChild variant="outline" size="sm" className="rounded-full">
                        <a href={featuredProject.repoUrl} target="_blank" rel="noreferrer">
                          <Github className="h-4 w-4" />
                          GitHub
                        </a>
                      </Button>
                    ) : null}
                    {featuredProject.liveUrl ? (
                      <Button asChild size="sm" className="rounded-full">
                        <a href={featuredProject.liveUrl} target="_blank" rel="noreferrer">
                          Demo
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.length > 0
            ? filteredProjects.map((project) => <ProjectCard key={project.id} project={project} />)
            : Array.from({ length: 3 }).map((_, index) => (
                <ProjectSkeleton key={`skeleton-${index}`} />
              ))}
        </div>
      </div>
    </section>
  );
}
