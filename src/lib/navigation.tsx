/**
 * Router-agnostic navigation layer.
 *
 * Sections and UI components must never import TanStack Router directly.
 * Everything routing-related lives here, so migrating to React Router or
 * Next.js later means rewriting only this file.
 */
import { Link } from "@tanstack/react-router";
import type { AnchorHTMLAttributes, ReactNode } from "react";

export function isHashHref(href: string) {
  return href.startsWith("#");
}

export function isExternalHref(href: string) {
  return /^(https?:)?\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

export function prefersReducedMotionNow() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Smoothly scroll to a section id, respecting reduced-motion. */
export function scrollToSection(sectionId: string, offset = 80) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(sectionId);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: prefersReducedMotionNow() ? "auto" : "smooth" });
  if (window.history.replaceState) {
    window.history.replaceState(null, "", `#${sectionId}`);
  }
}

/** Navigate anywhere: hash sections, external links, or internal routes. */
export function navigateTo(href: string) {
  if (typeof window === "undefined") return;
  if (isHashHref(href)) {
    scrollToSection(href.slice(1));
    return;
  }
  if (isExternalHref(href)) {
    window.open(href, "_blank", "noopener,noreferrer");
    return;
  }
  window.location.assign(href);
}

type NavLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

/**
 * Single link primitive for the whole app. Hash and external links render a
 * plain anchor; internal paths go through the platform router.
 */
export function NavLink({ href, children, onClick, ...rest }: NavLinkProps) {
  if (isHashHref(href)) {
    return (
      <a
        href={href}
        onClick={(event) => {
          onClick?.(event);
          if (event.defaultPrevented) return;
          event.preventDefault();
          scrollToSection(href.slice(1));
        }}
        {...rest}
      >
        {children}
      </a>
    );
  }

  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  const anchorProps = rest as Record<string, unknown>;
  return (
    <Link to={href} onClick={onClick} {...anchorProps}>
      {children}
    </Link>
  );
}
