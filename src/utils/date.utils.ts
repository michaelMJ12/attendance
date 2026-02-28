export const formatTime = (time: string): string =>
  time.slice(0, 5); // "08:00"

export const toDate = (iso: string): Date =>
  new Date(iso);
