import type { SkillGroup, SpokenLanguage } from "@/types";

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    sanskrit: "भाषा",
    skills: [
      { name: "TypeScript", level: "core" },
      { name: "JavaScript", level: "core" },
      { name: "Python", level: "core" },
      { name: "Java", level: "proficient" },
      { name: "C++", level: "proficient" },
      { name: "SQL", level: "proficient" },
      { name: "Go", level: "familiar" },
      { name: "Rust", level: "familiar" },
    ],
  },
  {
    id: "frameworks",
    title: "Frameworks & Tools",
    sanskrit: "उपकरण",
    skills: [
      { name: "React", level: "core" },
      { name: "Node.js", level: "core" },
      { name: "Tailwind CSS", level: "core" },
      { name: "PostgreSQL", level: "proficient" },
      { name: "Docker", level: "proficient" },
      { name: "FastAPI", level: "proficient" },
      { name: "Redis", level: "familiar" },
      { name: "AWS", level: "familiar" },
    ],
  },
];

export const spokenLanguages: SpokenLanguage[] = [
  { name: "Hindi", script: "हिन्दी", proficiency: "Native" },
  { name: "English", script: "English", proficiency: "Fluent" },
  { name: "Sanskrit", script: "संस्कृतम्", proficiency: "Reading" },
];

export const interpersonalTags: string[] = [
  "Systems thinking",
  "Calm under pressure",
  "Clear written communication",
  "Mentoring",
  "Long-horizon planning",
  "Attention to detail",
];
