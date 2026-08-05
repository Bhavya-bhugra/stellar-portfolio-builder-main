import { useCallback, useEffect, useMemo, useState } from "react";

import { chatService } from "@/services/chatService";
import type { ChatMessage } from "@/types";
import { uid } from "@/utils/misc";

const welcomeMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi — I’m the portfolio assistant. Ask about my stack, projects, chess, or availability and I’ll answer from the local corpus.",
  createdAt: Date.now(),
};

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [quickPrompts, setQuickPrompts] = useState<string[]>([]);
  const [context, setContext] = useState<{ intent: string | null; suggestions: string[] }>({
    intent: null,
    suggestions: [],
  });

  useEffect(() => {
    void chatService
      .getQuickPrompts()
      .then(setQuickPrompts)
      .catch(() => setQuickPrompts([]));
  }, []);

  const sendMessage = useCallback(
    async (question: string) => {
      const trimmed = question.trim();
      if (!trimmed || loading) return;

      const userMessage: ChatMessage = {
        id: uid("user"),
        role: "user",
        content: trimmed,
        createdAt: Date.now(),
      };

      setMessages((current) => [...current, userMessage]);
      setDraft("");
      setLoading(true);

      try {
        const response = await chatService.ask(trimmed);
        const assistantMessage: ChatMessage = {
          id: uid("assistant"),
          role: "assistant",
          content: response.answer,
          createdAt: Date.now(),
        };

        setMessages((current) => [...current, assistantMessage]);
        setContext({
          intent: response.matchedIntent,
          suggestions: response.suggestions,
        });
      } finally {
        setLoading(false);
      }
    },
    [loading],
  );

  const conversationHistory = useMemo(() => messages, [messages]);

  return {
    messages: conversationHistory,
    draft,
    setDraft,
    sendMessage,
    loading,
    quickPrompts,
    context,
  };
}
