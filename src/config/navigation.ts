import type { NavItem, SectionId } from "@/types";

export const navItems: NavItem[] = [
  { id: "mahadrishti", label: "Home", sanskrit: "महादृष्टि", href: "#mahadrishti" },
  { id: "vidya", label: "Skills", sanskrit: "विद्या", href: "#vidya" },
  { id: "karma-path", label: "Journey", sanskrit: "कर्मपथ", href: "#karma-path" },
  { id: "srijan", label: "Projects", sanskrit: "सृजन", href: "#srijan" },
  { id: "shatranj", label: "Chess", sanskrit: "शतरंज", href: "#shatranj" },
  { id: "samvaad", label: "Know Me", sanskrit: "संवाद", href: "#samvaad" },
  { id: "kriya", label: "Contact", sanskrit: "क्रिया", href: "#kriya" },
];

export const sectionOrder: SectionId[] = navItems.map((item) => item.id);
