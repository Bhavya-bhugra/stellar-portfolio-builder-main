import type { BuiltResponse } from "@/types";

const getApiBaseUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;
  if (envUrl && envUrl.trim().length > 0) {
    return envUrl.replace(/\/$/, "");
  }
  return "http://localhost:5000/api";
};

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export const chatService = {
  async ask(question: string): Promise<BuiltResponse> {
    const res = await fetch(`${getApiBaseUrl()}/chat/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    if (!res.ok) {
      throw new Error("Chat backend request failed");
    }

    const json = (await res.json()) as ApiResponse<BuiltResponse> | BuiltResponse;
    const response: BuiltResponse = "data" in json && json.data ? json.data : (json as BuiltResponse);
    return response;
  },

  async getQuickPrompts(): Promise<string[]> {
    try {
      const res = await fetch(`${getApiBaseUrl()}/chat/prompts`);
      if (!res.ok) return [];
      const json = (await res.json()) as ApiResponse<string[]> | string[];
      const prompts: string[] = "data" in json && Array.isArray(json.data) ? json.data : (json as string[]);
      return Array.isArray(prompts) ? prompts : [];
    } catch {
      return [];
    }
  },
};
