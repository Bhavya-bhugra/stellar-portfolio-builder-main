# Yash Sharma Portfolio — Frontend Architecture Plan

Frontend only. No backend, no auth, no database. The blueprint is the single source of truth for content, sections, and design.

## One stack note before we start

This project already runs on React 19 + Vite + Tailwind + TanStack Router (the platform's fixed router). Everything you asked for is covered — React, Vite, Tailwind, Framer Motion, reusable components, routing — except that navigation uses TanStack Router instead of React Router, which cannot be installed here. Since the portfolio is a single scrolling page with hash navigation between sections, this makes no practical difference. Router usage stays isolated: every section is an independent, router-agnostic component, and all navigation goes through reusable utilities (`src/lib/navigation.ts` + a `<NavLink>` wrapper) so a later move to React Router or Next.js touches only those files.

Tailwind is v4, so design tokens live in `src/styles.css` (`@theme`) rather than `tailwind.config.js`, using the exact color values from the blueprint.

## Resolved decisions

- Chess: `chessService` fetches Chess.com's public API for the configured username (no proxy needed), with sessionStorage caching, loading shimmer, and the blueprint's error state + retry.
- Contact form: full validation and states; `contactService.send()` is a mock that resolves success ("Message sent — Jai Shree Ram"), marked `// TODO(backend)`.
- Q&A corpus: curated ~70 pairs covering every intent category, in a file structured to expand to 500+ later.

## Services layer (`src/services/`)

Every section reads data through a hook, and every hook calls a service — components never import `src/data/*` directly. Each service exposes an async, promise-based API with typed inputs/outputs from `src/types/`, so swapping a mock for a real endpoint later touches only the service file.

- `chessService` — `getProfile()`, `getStats()`, `getRecentGames()`, `getRatingHistory()`; live public Chess.com fetch today, `// TODO(backend)` to route through our own API.
- `contactService` — `sendMessage(payload)`; mock delay + success, `// TODO(backend)` for the real submit endpoint.
- `projectService` — `listProjects()`, `getFilters()`; reads `src/data/projects`, `// TODO(backend)` for a CMS/API source.
- `chatService` — `ask(question)`, `getQuickPrompts()`; wraps the local TF-IDF engine, `// TODO(backend)` for a server-side/LLM answer.

Shape: `src/services/<name>/index.ts` (public API) + `<name>.mock.ts` where a mock backs it. Every mock file and every mock branch carries a `// TODO(backend): replace with real API call` marker.

## Page structure

Single page at `/` (`src/routes/index.tsx`), eight blueprint sections in order, hash anchors driving nav:

```text
/  →  #mahadrishti (Hero)
      #vidya       (Skills)
      #karma-path  (Journey)
      #srijan      (Projects)
      #shatranj    (Chess)
      #samvaad     (Know Me Better)
      #kriya       (Contact + Footer)
```

SEO lives in reusable pieces, not inline in the route: `src/components/seo/buildSeoMeta.ts` (a `head()` meta builder taking title/description/image/type) plus a `<StructuredData>` component for JSON-LD (Person schema). The route's `head()` is a one-line call into the builder, and `src/config/seo.ts` holds the defaults.

## Component hierarchy

```text
routes/index.tsx
└── SarvaPradhana (layout shell: theme class, fixed ChakraMandala bg)
    ├── KaalChakra        scroll progress bar
    ├── Akash             nav: monogram, links, theme toggle, Hire Me
    ├── HanumanDoot       scroll-reactive avatar (mood per section)
    └── main
        ├── Mahadrishti/  ChakraBackground · HeroText · AspirationsScroll · ScrollCue
        ├── Vidya/        SkillGrid (Languages, Frameworks) · SpokenLanguageCard · InterpersonalTags
        ├── KarmaPath/    TimelineRail · MilestoneNode
        ├── Srijan/       FilterTabs · YugaCard grid
        ├── Shatranj/     RatingStatCards · RatingChart · GameFeed · StrategicNote
        ├── Samvaad/      ContextPanel · QuickPrompts · ChatWindow (MessageBubble, TypingIndicator)
        └── Kriya/        ContactForm · SocialLinks · HireCTA · AvailabilityBadge · Footer
```

## Reusable components (`src/components/ui/`)

`SectionHeader`, `PranButton` (primary/secondary/ghost, 3 sizes, loading), `TechPill` (core/proficient/familiar dot), `YugaCard`, `GlowBorder`, `SanskritTag`, `LoadingShimmer`, `ResultBadge`.

Sacred geometry SVGs (`src/components/motifs/`): `ChakraMandala`, `JagannathArc`, `RathYatraLine`, `TrikonaSeal` — all at 0.04–0.08 opacity.

## Configuration (`src/config/`)

No hardcoded values in components. `site.ts` (name, tagline, role, location), `social.ts` (GitHub, LinkedIn, X, email, resume link), `navigation.ts` (nav items, section ids, order — consumed by the navigation utilities), `chess.ts` (username `yash_2805`, cache TTL, endpoints), `contact.ts` (recipient email, form limits), `theme.ts` (motion durations, easing, breakpoints, palette constants mirrored from tokens), `seo.ts` (default title/description/og).

## Folder organization

```text
src/
├── routes/index.tsx            single page + SEO head()
├── styles.css                  Tailwind v4 @theme tokens (blueprint palette)
├── styles/typography.css       text-display-xl … text-sanskrit
├── config/                     site · social · navigation · chess · contact · theme · seo
├── services/                   chessService · contactService · projectService · chatService (mocked)
├── types/                      project · chess · chat · contact · nav · common
├── utils/                      cn · formatDate · scrollToSection · storage · classnames helpers
├── assets/                     images, resume PDF, static SVG art
├── contexts/                   ScrollDrishtiContext · SamvaadContext · ThemeContext
├── hooks/                      useScrollDrishti · useSamvaad · useShatranj
│                               useKarmaTimeline · useContactForm · useReducedMotion
│                               (all data access goes hook → service)
├── engine/                     tokenizer · tfidf · intentClassifier · responseBuilder
├── data/                       resume · qaCorpus · timeline · projects · skills (services-only)
├── lib/navigation.ts           router-agnostic navigation utilities + <NavLink>
└── components/
    ├── layout/  sections/  ui/  motifs/  seo/
```

## Build sequence (one step per approval, as you asked)

1. Foundation — tokens, typography, fonts, config, types, utils, navigation utilities, services (mocked), SEO components, motif SVGs, shell (`SarvaPradhana`, `Akash`, `KaalChakra`, `HanumanDoot`), scroll context, data files
2. Hero — Mahadrishti
3. Skills — Vidya
4. Journey — KarmaPath
5. Projects — Srijan
6. Chess — Shatranj (live Chess.com fetch + Recharts)
7. Know Me Better — Samvaad (TF-IDF engine + corpus)
8. Contact + Footer — Kriya
9. Accessibility and responsive pass

## Technical details

- Fonts (Cinzel, Inter, JetBrains Mono, Tiro Devanagari Sanskrit) loaded via `<link>` in `__root.tsx`.
- Framer Motion for stagger, `useInView` reveals, and spring mood transitions; every animation gated by `useReducedMotion`.
- Recharts for the rating chart, Lucide for icons, React Hook Form + Zod for the contact form.
- Accessibility: semantic landmarks, single H1, visible focus rings, `aria-label` on icon buttons, chat log as an `aria-live` region, 44px tap targets, `h-dvh`, keyboard-navigable filter tabs and mobile menu.
- Responsive: mobile-first; avatar hidden below `md` and replaced by a floating indicator dot per the blueprint.
- Portability: sections take props/hooks only — no router imports inside `components/sections/`. `src/lib/navigation.ts` owns `navigateTo()`, `scrollToSection()`, and a `<NavLink>` wrapper over TanStack `Link`, so a later move to React Router or Next.js changes only that file plus `src/routes/`.
- Every mock service and simulated response carries a `// TODO(backend): replace with real API call` comment at the call site.