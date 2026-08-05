import { siteConfig } from "./site";

export const seoConfig = {
  title: `${siteConfig.name} — ${siteConfig.role} & Chess Player`,
  description:
    "Portfolio of Yash Sharma: full-stack developer and chess player. Projects, skills, live Chess.com stats, and an interactive way to get to know me.",
  siteUrl: "https://yashsharma.dev",
  ogType: "website",
  twitterCard: "summary_large_image",
} as const;
