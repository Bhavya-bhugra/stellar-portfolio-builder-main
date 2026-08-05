import { useCallback, useEffect, useState } from "react";

import { chessService } from "@/services/chessService";
import type { ChessSnapshot } from "@/types";

export function useChessSnapshot() {
  const [data, setData] = useState<ChessSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (force = false) => {
    setLoading(true);
    setError(null);

    try {
      const snapshot = await chessService.getSnapshot(force);
      setData(snapshot);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load Chess.com data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { data, loading, error, retry: () => void load(true) };
}
