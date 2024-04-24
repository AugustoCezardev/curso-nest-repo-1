export function startOfDay(date: Date): Date {
  return new Date(date.setHours(0, 0, 0, 0));
}

export function endOfDay(date: Date): Date {
  return new Date(date.setHours(23, 59, 59, 999));
}
