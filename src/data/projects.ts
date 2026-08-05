import type { Project, ProjectFilter } from "@/types";

export const projectFilters: ProjectFilter[] = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "ai", label: "AI" },
  { id: "systems", label: "Systems" },
  { id: "experiments", label: "Experiments" },
];

export const projects: Project[] = [
  {
    id: "p-ratha",
    title: "Ratha",
    sanskrit: "रथ",
    summary:
      "A logistics dashboard for small fleets: live route tracking, driver assignment, and a reporting layer built on Postgres materialised views.",
    category: "web",
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    year: "2026",
    repoUrl: "https://github.com/yash-sharma",
    highlight: "Cut dispatch planning time by 40%",
  },
  {
    id: "p-smriti",
    title: "Smriti",
    sanskrit: "स्मृति",
    summary:
      "A local-first note engine with semantic search. Embeddings stay on device, so recall is instant and nothing leaves the machine.",
    category: "ai",
    stack: ["Python", "FastAPI", "Embeddings", "SQLite"],
    year: "2025",
    repoUrl: "https://github.com/yash-sharma",
    highlight: "Sub-50ms semantic recall",
  },
  {
    id: "p-chakra",
    title: "Chakra Queue",
    sanskrit: "चक्र",
    summary:
      "A tiny durable job queue with retries, backoff, and dead-letter handling — written to understand what production queues actually guarantee.",
    category: "systems",
    stack: ["Go", "Redis", "Docker"],
    year: "2025",
    repoUrl: "https://github.com/yash-sharma",
    highlight: "At-least-once delivery, 12k jobs/min",
  },
  {
    id: "p-shatranj",
    title: "Shatranj Lab",
    sanskrit: "शतरंज",
    summary:
      "Opening repertoire trainer that reads my own Chess.com games and drills the positions I lose most often.",
    category: "experiments",
    stack: ["React", "Chess.com API", "IndexedDB"],
    year: "2024",
    liveUrl: "https://www.chess.com/member/yash_2805",
    highlight: "Built from 1,200 personal games",
  },
  {
    id: "p-vani",
    title: "Vani",
    sanskrit: "वाणी",
    summary:
      "Accessible transcript viewer with speaker diarisation, keyboard-first navigation, and full screen-reader support.",
    category: "ai",
    stack: ["React", "Web Audio", "TypeScript"],
    year: "2024",
    repoUrl: "https://github.com/yash-sharma",
    highlight: "WCAG AA verified",
  },
  {
    id: "p-setu",
    title: "Setu",
    sanskrit: "सेतु",
    summary:
      "A schema-aware API mock server that generates realistic fixtures from an OpenAPI spec so frontends can ship before the backend exists.",
    category: "systems",
    stack: ["Node.js", "OpenAPI", "Zod"],
    year: "2023",
    repoUrl: "https://github.com/yash-sharma",
  },
];
