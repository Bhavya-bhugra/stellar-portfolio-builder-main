const getApiBaseUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;
  if (envUrl && envUrl.trim().length > 0) {
    return envUrl.replace(/\/$/, "");
  }
  return "http://localhost:5000/api";
};

export const chessConfig = {
  username: "yash_2805",
  apiBase: `${getApiBaseUrl()}/chess`,
  profileUrl: "https://www.chess.com/member/yash_2805",
  cacheKey: "shatranj:snapshot",
  cacheTtlMs: 1000 * 60 * 30,
  recentGamesLimit: 6,
} as const;
