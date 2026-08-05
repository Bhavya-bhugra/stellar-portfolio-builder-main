import { Suspense, lazy } from "react";

import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/layout/app-shell";
import { Hero } from "@/components/sections/hero";
import { JourneySection } from "@/components/sections/journey";
import { ProjectsSection } from "@/components/sections/projects";
import { SkillsSection } from "@/components/sections/skills";

const ChessSection = lazy(() =>
  import("@/components/sections/chess").then((module) => ({ default: module.ChessSection })),
);
const ChatSection = lazy(() =>
  import("@/components/sections/chat").then((module) => ({ default: module.ChatSection })),
);
const ContactSection = lazy(() =>
  import("@/components/sections/contact").then((module) => ({ default: module.ContactSection })),
);

export const Route = createFileRoute("/")({
  component: Index,
});

function SectionFallback({ label }: { label: string }) {
  return (
    <div className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl animate-pulse rounded-[1.75rem] border border-border bg-card/50 p-6">
        <div className="h-4 w-28 rounded-full bg-muted" />
        <div className="mt-5 h-9 w-2/3 rounded-md bg-muted" />
        <div className="mt-3 h-4 w-1/2 rounded-md bg-muted" />
        <div className="mt-8 h-60 rounded-[1.5rem] bg-muted/80" />
        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function Index() {
  return (
    <AppShell>
      <Hero />
      <SkillsSection />
      <JourneySection />
      <ProjectsSection />
      <Suspense fallback={<SectionFallback label="Chess" />}>
        <ChessSection />
      </Suspense>
      <Suspense fallback={<SectionFallback label="Samvaad" />}>
        <ChatSection />
      </Suspense>
      <Suspense fallback={<SectionFallback label="Kriya" />}>
        <ContactSection />
      </Suspense>
    </AppShell>
  );
}
