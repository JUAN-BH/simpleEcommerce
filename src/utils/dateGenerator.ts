export function dateGenerator(): string {
  const date = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const today = `${year}-${month}-${date}`;
  return today;
}
