export function formatDate(input: string | number | Date): string {
  const date = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatRelative(input: string | number | Date): string {
  const date = input instanceof Date ? input : new Date(input);
  const diff = Date.now() - date.getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  return formatDate(date);
}

export function formatRecord(record: { win: number; loss: number; draw: number } | null): string {
  if (!record) return "—";
  return `${record.win}W · ${record.loss}L · ${record.draw}D`;
}
