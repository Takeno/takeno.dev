export function extractSlugFromPath(path: string) {
  return path.split('/').pop();
}
