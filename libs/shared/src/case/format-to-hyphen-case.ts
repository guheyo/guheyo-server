export function formatToHyphenCase(input: string) {
  return input.replace(/\s+/g, '-').toLowerCase();
}
