const STOP_WORDS = new Set([
  "a",
  "an",
  "the",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "am",
  "do",
  "does",
  "did",
  "of",
  "to",
  "in",
  "on",
  "for",
  "with",
  "at",
  "by",
  "from",
  "up",
  "about",
  "into",
  "over",
  "after",
  "and",
  "or",
  "but",
  "if",
  "then",
  "so",
  "than",
  "that",
  "this",
  "these",
  "those",
  "it",
  "its",
  "as",
  "can",
  "could",
  "would",
  "should",
  "will",
  "you",
  "your",
  "yours",
  "he",
  "she",
  "they",
  "them",
  "his",
  "her",
  "their",
  "we",
  "us",
  "our",
  "i",
  "me",
  "my",
  "what",
  "which",
  "who",
  "whom",
  "how",
  "when",
  "where",
  "why",
  "tell",
  "know",
  "much",
  "many",
  "some",
  "any",
]);

export function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s+#.]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function stem(token: string): string {
  return token
    .replace(/(ications|ication)$/, "ic")
    .replace(/(ing|ed|ers|er|es|s)$/, "")
    .replace(/(ly|ment|ness)$/, "");
}

export function tokenize(input: string): string[] {
  return normalize(input)
    .split(" ")
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token))
    .map(stem)
    .filter(Boolean);
}
