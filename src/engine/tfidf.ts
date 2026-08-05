import { tokenize } from "./tokenizer";

export interface IndexedDoc {
  id: string;
  vector: Map<string, number>;
  norm: number;
}

export interface TfIdfIndex {
  docs: IndexedDoc[];
  idf: Map<string, number>;
}

function termFrequencies(tokens: string[]): Map<string, number> {
  const tf = new Map<string, number>();
  tokens.forEach((token) => tf.set(token, (tf.get(token) ?? 0) + 1));
  return tf;
}

export function buildIndex(documents: { id: string; text: string }[]): TfIdfIndex {
  const tokenised = documents.map((doc) => ({ id: doc.id, tokens: tokenize(doc.text) }));
  const df = new Map<string, number>();

  tokenised.forEach(({ tokens }) => {
    new Set(tokens).forEach((token) => df.set(token, (df.get(token) ?? 0) + 1));
  });

  const total = Math.max(tokenised.length, 1);
  const idf = new Map<string, number>();
  df.forEach((count, token) => idf.set(token, Math.log((total + 1) / (count + 1)) + 1));

  const docs: IndexedDoc[] = tokenised.map(({ id, tokens }) => {
    const tf = termFrequencies(tokens);
    const vector = new Map<string, number>();
    tf.forEach((count, token) => {
      vector.set(token, (count / tokens.length) * (idf.get(token) ?? 1));
    });
    let sum = 0;
    vector.forEach((weight) => (sum += weight * weight));
    return { id, vector, norm: Math.sqrt(sum) || 1 };
  });

  return { docs, idf };
}

export function scoreQuery(index: TfIdfIndex, query: string): { id: string; score: number }[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const tf = termFrequencies(tokens);
  const queryVector = new Map<string, number>();
  tf.forEach((count, token) => {
    queryVector.set(token, (count / tokens.length) * (index.idf.get(token) ?? 1));
  });

  let queryNorm = 0;
  queryVector.forEach((weight) => (queryNorm += weight * weight));
  queryNorm = Math.sqrt(queryNorm) || 1;

  return index.docs
    .map((doc) => {
      let dot = 0;
      queryVector.forEach((weight, token) => {
        const docWeight = doc.vector.get(token);
        if (docWeight) dot += weight * docWeight;
      });
      return { id: doc.id, score: dot / (doc.norm * queryNorm) };
    })
    .sort((a, b) => b.score - a.score);
}
