import { Moon, SunMedium } from "lucide-react";

import { Button } from "@/components/ui/button";
import { navItems } from "@/config/navigation";
import { useTheme } from "@/components/providers/theme-provider";
import { siteConfig } from "@/config/site";

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#mahadrishti" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
            {siteConfig.monogram}
          </div>
          <div className="leading-none">
            <div className="text-sm font-semibold tracking-[0.2em] uppercase text-foreground">
              {siteConfig.name}
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              {siteConfig.role}
            </div>
          </div>
        </a>

        <nav className="hidden items-center gap-5 md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {theme === "dark" ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
