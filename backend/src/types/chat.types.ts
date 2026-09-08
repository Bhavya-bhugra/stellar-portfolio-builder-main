export interface QaPair {
  id: string;
  intent: string;
  questions: string[];
  answer: string;
}

export interface BuiltResponse {
  answer: string;
  matchedIntent: string | null;
  confidence: number;
  suggestions: string[];
}

export interface AskPayload {
  question: string;
}
