export function formatDate(date: string | number | Date): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat("no-NO", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(d);
}

export function formatTime(date: string | number | Date): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat("no-NO", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(d);
}
