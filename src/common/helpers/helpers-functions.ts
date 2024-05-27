export function customDate(date: Date) {
  const data = new Date(date);
  return Math.floor(data.getTime() / 1000);
}
