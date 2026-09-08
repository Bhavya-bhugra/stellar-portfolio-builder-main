import { env } from '../config/env.js';
import { AppError } from '../middleware/error.middleware.js';
import {
  ChessGame,
  ChessProfile,
  ChessSnapshot,
  ChessStat,
  RatingPoint,
  RawGame,
  RawStat,
} from '../types/chess.types.js';

const CHESS_COM_API_BASE = 'https://api.chess.com/pub';
const RECENT_GAMES_LIMIT = 6;
const REQUEST_TIMEOUT_MS = 8000;

interface CachedEntry<T> {
  data: T;
  cachedAt: number;
}

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'StellarPortfolioBackend/1.0',
      },
    });
    clearTimeout(timeoutId);
    return response;
  } catch (err) {
    clearTimeout(timeoutId);
    if (err instanceof Error && err.name === 'AbortError') {
      throw new AppError('Chess.com API request timed out', 504);
    }
    throw new AppError('Failed to communicate with Chess.com API', 502);
  }
}

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

export class ChessService {
  private snapshotCache: CachedEntry<ChessSnapshot> | null = null;

  private get username(): string {
    return env.CHESS_USERNAME;
  }

  private get profileUrl(): string {
    return `https://www.chess.com/member/${this.username}`;
  }

  public async getProfile(): Promise<ChessProfile> {
    const url = `${CHESS_COM_API_BASE}/player/${this.username}`;
    const res = await fetchWithTimeout(url);

    if (res.status === 404) {
      throw new AppError(`Chess.com user '${this.username}' not found`, 404);
    }
    if (!res.ok) {
      throw new AppError(`Chess.com profile request failed with status ${res.status}`, 502);
    }

    const data = (await res.json()) as {
      name?: string;
      avatar?: string;
      country?: string;
    };

    return {
      username: this.username,
      displayName: data.name ?? this.username,
      profileUrl: this.profileUrl,
      avatar: data.avatar,
      country: data.country,
    };
  }

  public async getStats(): Promise<ChessStat[]> {
    const url = `${CHESS_COM_API_BASE}/player/${this.username}/stats`;
    const res = await fetchWithTimeout(url);

    if (!res.ok) {
      throw new AppError(`Chess.com stats request failed with status ${res.status}`, 502);
    }

    const statsJson = (await res.json()) as Record<string, RawStat | undefined>;

    return [
      toStat('rapid', 'Rapid', statsJson.chess_rapid),
      toStat('blitz', 'Blitz', statsJson.chess_blitz),
      toStat('bullet', 'Bullet', statsJson.chess_bullet),
    ];
  }

  public async getRecentGames(): Promise<ChessGame[]> {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');

    const url = `${CHESS_COM_API_BASE}/player/${this.username}/games/${year}/${month}`;
    const res = await fetchWithTimeout(url);

    if (!res.ok) {
      return [];
    }

    const json = (await res.json()) as { games?: RawGame[] };
    const games: RawGame[] = Array.isArray(json.games) ? json.games : [];

    return games
      .slice(-RECENT_GAMES_LIMIT)
      .reverse()
      .map((game, index) => {
        const isWhite = game.white?.username?.toLowerCase() === this.username.toLowerCase();
        const me = isWhite ? game.white : game.black;
        const them = isWhite ? game.black : game.white;
        const result =
          me?.result === 'win'
            ? 'win'
            : me?.result === 'agreed' ||
                me?.result === 'stalemate' ||
                me?.result === 'repetition' ||
                me?.result === 'insufficient'
              ? 'draw'
              : 'loss';

        return {
          id: `${game.uuid ?? index}`,
          opponent: them?.username ?? 'Unknown',
          opponentRating: them?.rating ?? null,
          result,
          timeClass: game.time_class ?? 'rapid',
          playedAt: new Date((game.end_time ?? Date.now() / 1000) * 1000).toISOString(),
          url: game.url ?? this.profileUrl,
        } satisfies ChessGame;
      });
  }

  public async getRatingHistory(stats: ChessStat[], games: ChessGame[]): Promise<RatingPoint[]> {
    const rapidRating = stats[0]?.rating ?? 1200;
    return games
      .slice()
      .reverse()
      .map((game, i) => ({
        date: game.playedAt,
        rating: rapidRating + (i - games.length / 2) * 6,
      }));
  }

  public async getSnapshot(force = false): Promise<ChessSnapshot> {
    const now = Date.now();
    if (!force && this.snapshotCache && now - this.snapshotCache.cachedAt < env.CHESS_CACHE_TTL_MS) {
      return this.snapshotCache.data;
    }

    try {
      const [profile, stats, games] = await Promise.all([
        this.getProfile(),
        this.getStats(),
        this.getRecentGames(),
      ]);

      const ratingHistory = await this.getRatingHistory(stats, games);

      const snapshot: ChessSnapshot = {
        profile,
        stats,
        games,
        ratingHistory,
      };

      this.snapshotCache = {
        data: snapshot,
        cachedAt: now,
      };

      return snapshot;
    } catch (error) {
      // Graceful fallback to cached data if external API fails
      if (this.snapshotCache) {
        console.warn('[ChessService] External API failed. Serving stale cached snapshot as fallback.');
        return this.snapshotCache.data;
      }
      throw error;
    }
  }
}

export const chessService = new ChessService();
