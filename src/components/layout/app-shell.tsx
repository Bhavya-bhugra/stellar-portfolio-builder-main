import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SacredMotifs } from "@/components/layout/sacred-motifs";
import { ScrollProgress } from "@/components/layout/scroll-progress";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background text-foreground antialiased">
      <ScrollProgress />
      <Header />
      <div className="relative">
        <SacredMotifs />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
