import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function PageSection({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("relative scroll-mt-24", className)}>
      {children}
    </section>
  );
}
