import { buildResponse } from '../engine/responseBuilder.js';
import { qaCorpus } from '../data/qaCorpus.js';
import { BuiltResponse } from '../types/chat.types.js';

export class ChatService {
  public askQuestion(question: string): BuiltResponse {
    return buildResponse(question);
  }

  public getQuickPrompts(): string[] {
    return [
      "Who are you?",
      "What is your tech stack?",
      "Tell me about your chess",
      "Are you available for work?",
    ].filter(() => qaCorpus.length > 0);
  }
}

export const chatService = new ChatService();
