import { ArrowUpRight, Mail } from "lucide-react";

import { socialLinks } from "@/config/social";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-border/80 bg-background/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold">{siteConfig.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{siteConfig.tagline}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          {socialLinks.slice(0, 3).map((link) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
            >
              {link.label}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ))}
          <a
            href={`mailto:${siteConfig.email ?? "hello@yourdomain.com"}`}
            className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
          >
            <Mail className="h-3.5 w-3.5" />
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
