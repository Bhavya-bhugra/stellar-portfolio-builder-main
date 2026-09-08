import { chessConfig } from "@/config/chess";
import { readCache, writeCache } from "@/utils/storage";
import type { ChessGame, ChessSnapshot } from "@/types";

interface CachedSnapshot {
  at: number;
  snapshot: ChessSnapshot;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export const chessService = {
  /**
   * Reads Chess.com snapshot via our backend API (/api/chess/snapshot), cached in sessionStorage.
   */
  async getSnapshot(force = false): Promise<ChessSnapshot> {
    const cached = readCache<CachedSnapshot>(chessConfig.cacheKey);
    if (!force && cached && Date.now() - cached.at < chessConfig.cacheTtlMs) {
      return cached.snapshot;
    }

    const res = await fetch(`${chessConfig.apiBase}/snapshot`);
    if (!res.ok) {
      throw new Error("Chess backend request failed");
    }

    const json = (await res.json()) as ApiResponse<ChessSnapshot> | ChessSnapshot;
    const snapshot: ChessSnapshot = "data" in json && json.data ? json.data : (json as ChessSnapshot);

    writeCache(chessConfig.cacheKey, { at: Date.now(), snapshot } satisfies CachedSnapshot);
    return snapshot;
  },

  async getRecentGames(): Promise<ChessGame[]> {
    try {
      const res = await fetch(`${chessConfig.apiBase}/games`);
      if (!res.ok) return [];
      const json = (await res.json()) as ApiResponse<ChessGame[]> | ChessGame[];
      const games: ChessGame[] = "data" in json && Array.isArray(json.data) ? json.data : (json as ChessGame[]);
      return Array.isArray(games) ? games : [];
    } catch {
      return [];
    }
  },
};
