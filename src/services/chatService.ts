import { qaCorpus } from "@/data/qaCorpus";
import { buildResponse, type BuiltResponse } from "@/engine/responseBuilder";
import { delay } from "@/utils/misc";

export const chatService = {
  // TODO(backend): swap the local TF-IDF engine for a server-side/LLM answer endpoint.
  async ask(question: string): Promise<BuiltResponse> {
    await delay(450);
    return buildResponse(question);
  },
  async getQuickPrompts(): Promise<string[]> {
    return [
      "Who are you?",
      "What is your tech stack?",
      "Tell me about your chess",
      "Are you available for work?",
    ].filter((prompt) => qaCorpus.length > 0);
  },
};
