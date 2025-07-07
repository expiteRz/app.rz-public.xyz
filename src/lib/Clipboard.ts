export async function CopyToClipboard(content: string) {
  await navigator.clipboard.writeText(content);
}