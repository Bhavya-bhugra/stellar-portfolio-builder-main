import { contactConfig } from "@/config/contact";
import type { ContactPayload, ContactResult } from "@/types";

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

export const contactService = {
  async sendMessage(payload: ContactPayload): Promise<ContactResult> {
    try {
      const res = await fetch(`${getApiBaseUrl()}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = (await res.json()) as ApiResponse<ContactResult>;

      if (!res.ok) {
        return {
          ok: false,
          message: json.message || contactConfig.errorMessage,
        };
      }

      if (json.data) {
        return json.data;
      }

      return {
        ok: true,
        message: json.message || contactConfig.successMessage,
      };
    } catch {
      return {
        ok: false,
        message: contactConfig.errorMessage,
      };
    }
  },
};
