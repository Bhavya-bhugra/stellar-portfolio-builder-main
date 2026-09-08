import { classify, relatedIntents } from "./intentClassifier.js";
import { BuiltResponse } from "../types/chat.types.js";

const FALLBACKS = [
  "I don't have that one written down yet. Try asking about my stack, projects, chess, or how to reach me.",
  "That's outside what I've prepared. Ask me about my experience, favourite project, or availability.",
];

export function buildResponse(question: string): BuiltResponse {
  const { pair, score } = classify(question);
  const suggestions = relatedIntents(question).map((related) => related.questions[0]!);

  if (!pair) {
    return {
      answer: FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)]!,
      matchedIntent: null,
      confidence: score,
      suggestions,
    };
  }

  return { answer: pair.answer, matchedIntent: pair.intent, confidence: score, suggestions };
}
