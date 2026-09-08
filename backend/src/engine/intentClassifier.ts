import { qaCorpus } from "../data/qaCorpus.js";
import { buildIndex, scoreQuery, TfIdfIndex } from "./tfidf.js";
import { QaPair } from "../types/chat.types.js";

let cachedIndex: TfIdfIndex | null = null;

function getIndex(): TfIdfIndex {
  if (!cachedIndex) {
    cachedIndex = buildIndex(
      qaCorpus.map((pair) => ({
        id: pair.id,
        text: [pair.intent, ...pair.questions, pair.answer].join(" "),
      })),
    );
  }
  return cachedIndex;
}

export interface Classification {
  pair: QaPair | null;
  score: number;
}

export const CONFIDENCE_THRESHOLD = 0.08;

export function classify(question: string): Classification {
  const ranked = scoreQuery(getIndex(), question);
  const best = ranked[0];
  if (!best || best.score < CONFIDENCE_THRESHOLD) return { pair: null, score: best?.score ?? 0 };
  return { pair: qaCorpus.find((pair) => pair.id === best.id) ?? null, score: best.score };
}

export function relatedIntents(question: string, limit = 3): QaPair[] {
  return scoreQuery(getIndex(), question)
    .slice(1, limit + 1)
    .filter((entry) => entry.score > CONFIDENCE_THRESHOLD)
    .map((entry) => qaCorpus.find((pair) => pair.id === entry.id))
    .filter((pair): pair is QaPair => Boolean(pair));
}
