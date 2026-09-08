export type SectionId =
  "mahadrishti" | "vidya" | "karma-path" | "srijan" | "shatranj" | "samvaad" | "kriya";

export interface NavItem {
  id: SectionId;
  label: string;
  sanskrit: string;
  href: string;
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail" | "crown" | "twitter";
}

export type SkillLevel = "core" | "proficient" | "familiar";

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface SkillGroup {
  id: string;
  title: string;
  sanskrit: string;
  skills: Skill[];
}

export interface SpokenLanguage {
  name: string;
  script: string;
  proficiency: string;
}

export interface Milestone {
  id: string;
  year: string;
  title: string;
  organisation: string;
  description: string;
  tags: string[];
}

export type ProjectCategory = "web" | "ai" | "systems" | "experiments";

export interface Project {
  id: string;
  title: string;
  sanskrit: string;
  summary: string;
  category: ProjectCategory;
  stack: string[];
  year: string;
  repoUrl?: string;
  liveUrl?: string;
  highlight?: string;
}

export interface ProjectFilter {
  id: ProjectCategory | "all";
  label: string;
}

export interface ChessProfile {
  username: string;
  displayName: string;
  profileUrl: string;
  avatar?: string;
  country?: string;
}

export interface ChessStat {
  id: string;
  label: string;
  rating: number | null;
  best: number | null;
  record: { win: number; loss: number; draw: number } | null;
}

export type ChessResult = "win" | "loss" | "draw";

export interface ChessGame {
  id: string;
  opponent: string;
  opponentRating: number | null;
  result: ChessResult;
  timeClass: string;
  playedAt: string;
  url: string;
}

export interface RatingPoint {
  date: string;
  rating: number;
}

export interface ChessSnapshot {
  profile: ChessProfile;
  stats: ChessStat[];
  games: ChessGame[];
  ratingHistory: RatingPoint[];
}

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
}

export interface BuiltResponse {
  answer: string;
  matchedIntent: string | null;
  confidence: number;
  suggestions: string[];
}

export interface QaPair {
  id: string;
  intent: string;
  questions: string[];
  answer: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResult {
  ok: boolean;
  message: string;
}

export type AsyncState = "idle" | "loading" | "success" | "error";
