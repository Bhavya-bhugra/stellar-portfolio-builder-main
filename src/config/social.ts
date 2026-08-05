import type { SocialLink } from "@/types";

export const contactEmail = "yash.sharma.dev@gmail.com";

export const socialLinks: SocialLink[] = [
  { id: "github", label: "GitHub", href: "https://github.com/yash-sharma", icon: "github" },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/yash-sharma",
    icon: "linkedin",
  },
  {
    id: "chess",
    label: "Chess.com",
    href: "https://www.chess.com/member/yash_2805",
    icon: "crown",
  },
  { id: "email", label: "Email", href: `mailto:${contactEmail}`, icon: "mail" },
];
