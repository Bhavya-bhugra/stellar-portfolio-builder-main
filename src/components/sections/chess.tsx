import { motion, useReducedMotion } from "framer-motion";
import { AlertCircle, ArrowUpRight, RefreshCw, Trophy } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { useChessSnapshot } from "@/hooks/use-chess-snapshot";
import type { ChessGame, ChessSnapshot, ChessStat } from "@/types";

function RatingCard({ stat }: { stat: ChessStat }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="rounded-[1.5rem] border border-border bg-card/70 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.08)]"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">{stat.label}</p>
        <Trophy className="h-4 w-4 text-primary" />
      </div>
      <div className="mt-4 text-3xl font-bold text-foreground">{stat.rating ?? "—"}</div>
      <div className="mt-3 text-sm text-muted-foreground">Best: {stat.best ?? "—"}</div>
      {stat.record ? (
        <div className="mt-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <span>{stat.record.win}W</span>
          <span>{stat.record.loss}L</span>
          <span>{stat.record.draw}D</span>
        </div>
      ) : null}
    </motion.div>
  );
}

function RatingChart({ snapshot }: { snapshot: ChessSnapshot }) {
  const values = snapshot.ratingHistory.map((point) => point.rating);
  if (values.length === 0) return null;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const points = values
    .map((value, index) => {
      const x = (index / Math.max(values.length - 1, 1)) * 100;
      const y = 100 - ((value - min) / range) * 80 - 10;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="rounded-[1.5rem] border border-border bg-card/70 p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Rating trend</p>
        <Badge
          variant="outline"
          className="rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.18em]"
        >
          {snapshot.stats[0]?.rating ?? "—"}
        </Badge>
      </div>

      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-40 w-full">
        <defs>
          <linearGradient id="rating-line" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <path
          d="M 0 100 L 100 100 L 100 0"
          fill="none"
          stroke="rgba(148,163,184,0.18)"
          strokeWidth="0.8"
        />
        <polyline
          points={points}
          fill="none"
          stroke="url(#rating-line)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
      </svg>
    </div>
  );
}

function RecentGamesList({ games }: { games: ChessGame[] }) {
  return (
    <div className="rounded-[1.5rem] border border-border bg-card/70 p-5">
      <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Recent games</p>
      <div className="mt-4 space-y-3">
        {games.map((game) => (
          <div
            key={game.id}
            className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-background/70 p-3"
          >
            <div>
              <div className="font-medium text-foreground">vs {game.opponent}</div>
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {game.timeClass} · {new Date(game.playedAt).toLocaleDateString()}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                variant={
                  game.result === "win"
                    ? "default"
                    : game.result === "draw"
                      ? "secondary"
                      : "outline"
                }
                className="rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.16em]"
              >
                {game.result}
              </Badge>
              <a
                href={game.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`View game against ${game.opponent}`}
              >
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChessSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={`rating-skeleton-${index}`}
            className="rounded-[1.5rem] border border-border bg-card/70 p-5"
          >
            <div className="h-4 w-20 animate-pulse rounded-full bg-muted" />
            <div className="mt-5 h-8 w-2/3 animate-pulse rounded bg-muted" />
            <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="h-48 animate-pulse rounded-[1.5rem] border border-border bg-card/70" />
        <div className="h-48 animate-pulse rounded-[1.5rem] border border-border bg-card/70" />
      </div>
    </div>
  );
}

export function ChessSection() {
  const prefersReducedMotion = useReducedMotion();
  const { data, loading, error, retry } = useChessSnapshot();

  return (
    <section id="shatranj" className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: "easeOut" }}
        >
          <SectionHeader
            eyebrow="Shatranj"
            title="A live chess practice ledger."
            description="Ratings, trend lines, and recent results from the public Chess.com API, cached in session storage for a lighter reload experience."
            align="center"
          />
        </motion.div>

        {loading && !data ? (
          <div className="mt-10">
            <ChessSkeleton />
          </div>
        ) : null}

        {error && !data ? (
          <div className="mt-10 rounded-[1.5rem] border border-destructive/30 bg-destructive/5 p-6 text-left">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 text-destructive" />
              <div>
                <p className="font-medium text-foreground">Unable to load live chess data.</p>
                <p className="mt-1 text-sm text-muted-foreground">{error}</p>
              </div>
            </div>
            <Button type="button" onClick={retry} className="mt-5 rounded-full" variant="outline">
              <RefreshCw className="h-4 w-4" />
              Retry
            </Button>
          </div>
        ) : null}

        {data ? (
          <div className="mt-10 space-y-8">
            <div className="grid gap-4 md:grid-cols-3">
              {data.stats.map((stat) => (
                <RatingCard key={stat.id} stat={stat} />
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
              <RatingChart snapshot={data} />
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Username
                      </p>
                      <p className="mt-2 text-lg font-medium text-foreground">
                        {data.profile.displayName}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Handle
                      </p>
                      <p className="mt-2 text-lg font-medium text-foreground">
                        {data.profile.username}
                      </p>
                    </div>
                  </div>
                  <a
                    href={data.profile.profileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary"
                  >
                    Open Chess.com profile
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </CardContent>
              </Card>
            </div>

            <RecentGamesList games={data.games} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
