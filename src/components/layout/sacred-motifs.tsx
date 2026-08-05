export function SacredMotifs() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-12 top-20 h-48 w-48 rounded-full border border-primary/20 bg-primary/5 blur-3xl" />
      <div className="absolute right-0 top-10 h-64 w-64 rounded-full border border-violet-400/20 bg-violet-500/10 blur-3xl" />
      <div className="absolute bottom-8 left-1/3 h-56 w-56 rounded-full border border-saffron/20 bg-saffron/10 blur-3xl" />

      <svg
        className="absolute inset-0 h-full w-full opacity-[0.18]"
        viewBox="0 0 1200 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="190" cy="260" r="120" stroke="currentColor" className="text-primary/40" />
        <circle cx="190" cy="260" r="60" stroke="currentColor" className="text-primary/30" />
        <circle cx="960" cy="220" r="160" stroke="currentColor" className="text-violet-400/35" />
        <circle cx="960" cy="220" r="88" stroke="currentColor" className="text-violet-400/25" />
        <path
          d="M118 610C250 470 330 470 470 610C600 750 670 750 820 610"
          stroke="currentColor"
          className="text-saffron/35"
        />
        <path
          d="M760 720C800 580 880 520 1010 520"
          stroke="currentColor"
          className="text-saffron/25"
        />
      </svg>
    </div>
  );
}
