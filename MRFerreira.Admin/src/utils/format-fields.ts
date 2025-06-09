export function removeSpecialCharacters(value: string): string {
  return value.replace(/[^\d]/g, "");
}