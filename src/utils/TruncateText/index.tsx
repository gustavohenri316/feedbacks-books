export function truncateText(text: string | undefined, maxLength: number) {
  if (!text) {
    return "";
  }
  if (text.length <= maxLength) {
    return text;
  }
  return text.substr(0, maxLength) + "...";
}
