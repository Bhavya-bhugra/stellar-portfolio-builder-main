import { QaPair } from '../types/chat.types.js';

export const qaCorpus: QaPair[] = [
  {
    id: "qa-intro",
    intent: "introduction",
    questions: ["Who are you?", "Tell me about yourself", "Introduce yourself"],
    answer:
      "I'm Yash Sharma, a full-stack developer. I build typed, accessible web products end to end — React and TypeScript on the front, Node and Postgres behind it. Outside code I play a lot of chess, which is where most of my patience comes from.",
  },
  {
    id: "qa-stack",
    intent: "tech-stack",
    questions: [
      "What is your tech stack?",
      "Which technologies do you use?",
      "What do you code in?",
    ],
    answer:
      "Daily: TypeScript, React, Node.js, Tailwind, and PostgreSQL. Comfortable with Python and FastAPI for data work, Docker for shipping, and Go or Rust when a problem deserves them.",
  },
  {
    id: "qa-strongest-language",
    intent: "strongest-language",
    questions: ["What language are you best at?", "Your strongest programming language?"],
    answer:
      "TypeScript. I lean on the type system hard — schemas at the boundary, inference everywhere inside, and very few escape hatches.",
  },
  {
    id: "qa-frontend",
    intent: "frontend",
    questions: ["How good is your frontend work?", "Do you do UI?", "Frontend experience?"],
    answer:
      "Frontend is my strongest surface. I build design systems, care about motion and focus states, and treat accessibility and performance budgets as requirements rather than a final pass.",
  },
  {
    id: "qa-backend",
    intent: "backend",
    questions: ["Do you work on backend?", "Backend experience?", "Do you write APIs?"],
    answer:
      "Yes. Node and FastAPI services, Postgres schema design, background jobs, caching with Redis, and containerised deploys. I like boring, observable backends.",
  },
  {
    id: "qa-projects",
    intent: "projects",
    questions: ["What projects have you built?", "Show me your work", "Your best projects?"],
    answer:
      "Ratha (fleet logistics dashboard), Smriti (local-first semantic notes), Chakra Queue (durable job queue in Go), Shatranj Lab (chess repertoire trainer), Vani (accessible transcripts), and Setu (OpenAPI mock server). The Projects section has details on each.",
  },
  {
    id: "qa-favourite-project",
    intent: "favourite-project",
    questions: ["What is your favourite project?", "Which project are you proudest of?"],
    answer:
      "Chakra Queue. Writing a durable queue with retries, backoff, and dead-letter handling taught me what production systems actually promise — and what they quietly don't.",
  },
  {
    id: "qa-hardest-bug",
    intent: "hardest-bug",
    questions: ["Hardest bug you've fixed?", "Tell me about a tough debugging story"],
    answer:
      "A queue that silently dropped jobs under load. It turned out to be an at-most-once ack path hidden behind a retry wrapper. Fixing it meant rewriting the ack contract, not the retry code.",
  },
  {
    id: "qa-chess",
    intent: "chess",
    questions: ["Do you play chess?", "Tell me about your chess", "Chess rating?"],
    answer:
      "I play as yash_2805 on Chess.com — mostly rapid and blitz. The Shatranj section pulls my live ratings, recent games, and rating trend straight from the public API.",
  },
  {
    id: "qa-chess-style",
    intent: "chess-style",
    questions: ["What is your chess style?", "Favourite opening?", "How do you play chess?"],
    answer:
      "Positional and patient. I prefer slow structural pressure over sharp tactics, which is also how I approach refactors: improve the position, then take the material.",
  },
  {
    id: "qa-chess-code",
    intent: "chess-and-code",
    questions: ["How does chess help your coding?", "Chess and programming connection?"],
    answer:
      "Both reward calculating one move deeper than feels comfortable. Chess taught me to evaluate before I move, to accept a worse-looking line if the endgame is better, and not to panic when the position gets sharp.",
  },
  {
    id: "qa-experience",
    intent: "experience",
    questions: ["How much experience do you have?", "Years of experience?", "Your background?"],
    answer:
      "Around three years of serious building: self-taught foundations in 2023, open source and competitive programming in 2024, an engineering internship in 2025, and full-stack product work since.",
  },
  {
    id: "qa-education",
    intent: "education",
    questions: ["Where did you study?", "Your education?", "Do you have a degree?"],
    answer:
      "B.Tech in Computer Science (2022–2026). Most of what I use daily, though, came from shipping projects and reading other people's source code.",
  },
  {
    id: "qa-availability",
    intent: "availability",
    questions: ["Are you available for work?", "Can I hire you?", "Are you open to opportunities?"],
    answer:
      "Yes — I'm open to internships, full-time roles, and freelance work. The Contact section has a form, or you can email me directly.",
  },
  {
    id: "qa-contact",
    intent: "contact",
    questions: ["How do I contact you?", "What is your email?", "How can I reach you?"],
    answer:
      "Use the contact form in the Kriya section, or email yash.sharma.dev@gmail.com. I usually reply within a day.",
  },
  {
    id: "qa-location",
    intent: "location",
    questions: ["Where are you based?", "Your location?", "Do you work remotely?"],
    answer:
      "I'm based in India and work remotely by default. I'm comfortable with async collaboration across time zones.",
  },
  {
    id: "qa-languages-spoken",
    intent: "spoken-languages",
    questions: ["What languages do you speak?", "Do you speak Hindi?"],
    answer:
      "Hindi natively, English fluently, and enough Sanskrit to read — which is where this site's naming comes from.",
  },
  {
    id: "qa-strengths",
    intent: "strengths",
    questions: ["What are your strengths?", "What are you good at?"],
    answer:
      "Systems thinking, staying calm when things break, and writing clearly. I'd rather spend an hour naming things well than a week explaining them later.",
  },
  {
    id: "qa-weaknesses",
    intent: "weaknesses",
    questions: ["What are your weaknesses?", "What do you struggle with?"],
    answer:
      "I over-polish. Left alone I'll keep refining an interaction past the point of return, so I set explicit budgets and ship.",
  },
  {
    id: "qa-learning",
    intent: "learning",
    questions: ["What are you learning right now?", "What's next for you?"],
    answer:
      "Distributed systems fundamentals and Rust. I'm working through consensus and storage engines because I want to understand databases from the inside out.",
  },
  {
    id: "qa-accessibility",
    intent: "accessibility",
    questions: ["Do you care about accessibility?", "Is your work accessible?"],
    answer:
      "Always. Semantic landmarks, visible focus rings, keyboard paths for every interaction, live regions for dynamic content, and reduced-motion support. Vani was verified against WCAG AA.",
  },
  {
    id: "qa-performance",
    intent: "performance",
    questions: ["How do you handle performance?", "Do you optimise for speed?"],
    answer:
      "Budgets first, measurements second, tricks last. Ship less JavaScript, defer what isn't visible, cache aggressively at the edges, and profile before optimising anything.",
  },
  {
    id: "qa-testing",
    intent: "testing",
    questions: ["Do you write tests?", "How do you test your code?"],
    answer:
      "Unit tests for logic, integration tests around the data layer, and a thin end-to-end pass over the critical path. I test behaviour, not implementation details.",
  },
  {
    id: "qa-design",
    intent: "design",
    questions: ["Do you design too?", "Can you do UI design?"],
    answer:
      "I design what I build. Not a brand designer, but I'm comfortable with type scales, spacing systems, colour tokens, and motion that supports rather than distracts.",
  },
  {
    id: "qa-teamwork",
    intent: "teamwork",
    questions: ["How do you work in a team?", "Are you a team player?"],
    answer:
      "I write things down. Design notes before implementation, decisions recorded with their trade-offs, and reviews that ask questions instead of issuing verdicts.",
  },
  {
    id: "qa-ai",
    intent: "ai",
    questions: ["Do you work with AI?", "Any machine learning experience?"],
    answer:
      "Applied AI, mostly. Embeddings and retrieval in Smriti, on-device inference trade-offs, and the plumbing that makes model output usable in a product.",
  },
  {
    id: "qa-opensource",
    intent: "open-source",
    questions: ["Do you contribute to open source?", "Your GitHub?"],
    answer:
      "Yes — mostly small fixes to developer tooling and documentation. Everything public lives on my GitHub, linked in the footer.",
  },
  {
    id: "qa-resume",
    intent: "resume",
    questions: ["Can I see your resume?", "Do you have a CV?"],
    answer:
      "There's a resume download in the Contact section, and the Journey section covers the same ground visually.",
  },
  {
    id: "qa-site",
    intent: "about-this-site",
    questions: ["How did you build this site?", "What is this portfolio built with?"],
    answer:
      "React 19, Vite, Tailwind v4, and Framer Motion, with a services layer so every section can swap mock data for a real API later. The chat you're using runs a small TF-IDF matcher entirely in your browser — no server, no model calls.",
  },
  {
    id: "qa-naming",
    intent: "sanskrit-naming",
    questions: ["Why Sanskrit names?", "What do the section names mean?"],
    answer:
      "Each section is named for what it does: Mahadrishti (vision), Vidya (knowledge), Karma Path (the road walked), Srijan (creation), Shatranj (chess), Samvaad (dialogue), and Kriya (action).",
  },
  {
    id: "qa-motivation",
    intent: "motivation",
    questions: ["Why do you code?", "What motivates you?"],
    answer:
      "The same thing chess gives me: a problem with real constraints, and the quiet of working through it until the position resolves.",
  },
  {
    id: "qa-hobbies",
    intent: "hobbies",
    questions: ["What are your hobbies?", "What do you do outside work?"],
    answer:
      "Chess, Sanskrit literature, temple architecture, and long-form writing. Mostly slow things.",
  },
  {
    id: "qa-work-style",
    intent: "work-style",
    questions: ["How do you work?", "What's your working style?"],
    answer:
      "Deep blocks, few meetings, everything written down. I plan the shape of a change before touching code, then ship in small reviewable pieces.",
  },
  {
    id: "qa-freelance",
    intent: "freelance",
    questions: ["Do you take freelance projects?", "Can you build something for me?"],
    answer:
      "Yes, for well-scoped work. Send a description of the problem and the deadline through the contact form and I'll tell you honestly whether I'm the right fit.",
  },
  {
    id: "qa-rates",
    intent: "rates",
    questions: ["What are your rates?", "How much do you charge?"],
    answer:
      "It depends on scope and timeline. Describe the project in the contact form and I'll come back with a range rather than guess here.",
  },
  {
    id: "qa-remote",
    intent: "remote",
    questions: ["Can you work remotely?", "Do you relocate?"],
    answer:
      "Remote is my default and I work well async. Relocation is possible for the right role.",
  },
  {
    id: "qa-databases",
    intent: "databases",
    questions: ["Which databases do you use?", "Do you know SQL?"],
    answer:
      "PostgreSQL primarily — schema design, indexing, materialised views, and query plans. SQLite for local-first work, Redis for caching and queues.",
  },
  {
    id: "qa-devops",
    intent: "devops",
    questions: ["Do you do DevOps?", "How do you deploy?"],
    answer:
      "Docker images, CI on every push, migrations gated behind review, and deploys that can roll back. Enough infrastructure to be self-sufficient, not enough to call myself an SRE.",
  },
  {
    id: "qa-code-review",
    intent: "code-review",
    questions: ["How do you review code?", "Your code review philosophy?"],
    answer:
      "Correctness, then clarity, then style — and style is what the linter says, not what I prefer. I ask questions before asserting, because the author usually knows something I don't.",
  },
  {
    id: "qa-mentoring",
    intent: "mentoring",
    questions: ["Do you mentor?", "Do you teach?"],
    answer:
      "I mentor juniors on fundamentals and debugging technique. Teaching someone to isolate a problem is worth more than handing them the fix.",
  },
  {
    id: "qa-goals",
    intent: "goals",
    questions: ["What are your goals?", "Where do you see yourself?"],
    answer:
      "Working on infrastructure or developer tools — products where the users are engineers and correctness is the feature.",
  },
  {
    id: "qa-fun-fact",
    intent: "fun-fact",
    questions: ["Tell me a fun fact", "Something interesting about you?"],
    answer:
      "I've analysed over a thousand of my own chess games. Shatranj Lab exists because I got tired of losing the same endgame twice.",
  },
  {
    id: "qa-greeting",
    intent: "greeting",
    questions: ["Hi", "Hello", "Namaste", "Hey there"],
    answer: "Namaste. Ask me anything — my stack, projects, chess, availability, or how I work.",
  },
  {
    id: "qa-thanks",
    intent: "thanks",
    questions: ["Thanks", "Thank you", "That's helpful"],
    answer:
      "Anytime. If something here fits what you're building, the contact form is one section down.",
  },
];
