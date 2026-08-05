export const themeConfig = {
  storageKey: "portfolio:theme",
  defaultTheme: "dark" as "dark" | "light",
  motion: {
    fast: 0.25,
    base: 0.5,
    slow: 0.9,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    stagger: 0.08,
  },
  motifOpacity: { faint: 0.04, soft: 0.06, visible: 0.08 },
  breakpoints: { sm: 640, md: 768, lg: 1024, xl: 1280 },
} as const;
