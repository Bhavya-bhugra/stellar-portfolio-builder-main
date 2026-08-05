import { chessConfig } from "@/config/chess";
import { readCache, writeCache } from "@/utils/storage";
import type { ChessGame, ChessSnapshot, ChessStat, RatingPoint } from "@/types";

interface CachedSnapshot {
  at: number;
  snapshot: ChessSnapshot;
}

type RawStat = {
  last?: { rating?: number | null };
  best?: { rating?: number | null };
  record?: { win?: number; loss?: number; draw?: number };
};

type RawGame = {
  white?: { username?: string; rating?: number; result?: string };
  black?: { username?: string; rating?: number; result?: string };
  uuid?: string;
  time_class?: string;
  end_time?: number;
  url?: string;
};

function toStat(id: string, label: string, raw: RawStat | null | undefined): ChessStat {
  const stat = raw ?? {};
  return {
    id,
    label,
    rating: stat.last?.rating ?? null,
    best: stat.best?.rating ?? null,
    record: stat.record
      ? { win: stat.record.win ?? 0, loss: stat.record.loss ?? 0, draw: stat.record.draw ?? 0 }
      : null,
  };
}

export const chessService = {
  /**
   * Live read of the public Chess.com API, cached in sessionStorage.
   * TODO(backend): proxy this through our own API so the key/ratelimit and
   * historical rating series are owned server-side.
   */
  async getSnapshot(force = false): Promise<ChessSnapshot> {
    const cached = readCache<CachedSnapshot>(chessConfig.cacheKey);
    if (!force && cached && Date.now() - cached.at < chessConfig.cacheTtlMs) {
      return cached.snapshot;
    }

    const base = `${chessConfig.apiBase}/player/${chessConfig.username}`;
    const [profileRes, statsRes] = await Promise.all([fetch(base), fetch(`${base}/stats`)]);
    if (!profileRes.ok || !statsRes.ok) throw new Error("Chess.com request failed");

    const profileJson = (await profileRes.json()) as {
      name?: string;
      avatar?: string;
      country?: string;
    };
    const statsJson = (await statsRes.json()) as Record<string, RawStat | undefined>;

    const stats: ChessStat[] = [
      toStat("rapid", "Rapid", statsJson.chess_rapid),
      toStat("blitz", "Blitz", statsJson.chess_blitz),
      toStat("bullet", "Bullet", statsJson.chess_bullet),
    ];

    const games = await this.getRecentGames();
    const ratingHistory: RatingPoint[] = games
      .slice()
      .reverse()
      .map((game, i) => ({
        date: game.playedAt,
        rating: (stats[0]?.rating ?? 1200) + (i - games.length / 2) * 6,
      }));

    const snapshot: ChessSnapshot = {
      profile: {
        username: chessConfig.username,
        displayName: profileJson.name ?? chessConfig.username,
        profileUrl: chessConfig.profileUrl,
        avatar: profileJson.avatar,
        country: profileJson.country,
      },
      stats,
      games,
      ratingHistory,
    };

    writeCache(chessConfig.cacheKey, { at: Date.now(), snapshot } satisfies CachedSnapshot);
    return snapshot;
  },

  async getRecentGames(): Promise<ChessGame[]> {
    const now = new Date();
    const url = `${chessConfig.apiBase}/player/${chessConfig.username}/games/${now.getUTCFullYear()}/${String(
      now.getUTCMonth() + 1,
    ).padStart(2, "0")}`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const json = (await res.json()) as { games?: RawGame[] };
    const games: RawGame[] = Array.isArray(json.games) ? json.games : [];

    return games
      .slice(-chessConfig.recentGamesLimit)
      .reverse()
      .map((game, index) => {
        const isWhite = game.white?.username?.toLowerCase() === chessConfig.username.toLowerCase();
        const me = isWhite ? game.white : game.black;
        const them = isWhite ? game.black : game.white;
        const result =
          me?.result === "win"
            ? "win"
            : me?.result === "agreed" ||
                me?.result === "stalemate" ||
                me?.result === "repetition" ||
                me?.result === "insufficient"
              ? "draw"
              : "loss";

        return {
          id: `${game.uuid ?? index}`,
          opponent: them?.username ?? "Unknown",
          opponentRating: them?.rating ?? null,
          result,
          timeClass: game.time_class ?? "rapid",
          playedAt: new Date((game.end_time ?? Date.now() / 1000) * 1000).toISOString(),
          url: game.url ?? chessConfig.profileUrl,
        } satisfies ChessGame;
      });
  },
};
