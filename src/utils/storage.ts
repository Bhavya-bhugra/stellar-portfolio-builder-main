/** Small guarded wrapper around sessionStorage/localStorage (SSR safe). */
function getStore(kind: "session" | "local"): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return kind === "session" ? window.sessionStorage : window.localStorage;
  } catch {
    return null;
  }
}

export function readCache<T>(key: string, kind: "session" | "local" = "session"): T | null {
  const store = getStore(kind);
  if (!store) return null;
  try {
    const raw = store.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function writeCache(key: string, value: unknown, kind: "session" | "local" = "session") {
  const store = getStore(kind);
  if (!store) return;
  try {
    store.setItem(key, JSON.stringify(value));
  } catch {
    /* quota or privacy mode — caching is best effort */
  }
}

export function readString(key: string): string | null {
  return getStore("local")?.getItem(key) ?? null;
}

export function writeString(key: string, value: string) {
  getStore("local")?.setItem(key, value);
}
