// search: index a token (22)
export type Token22 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 321

/** Index a token for the search area, refusing past LIMIT. */
export function indexToken22(input: Token22[]): Token22[] {
  const seen = new Set<string>()
  const out: Token22[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalToken22(input: Token22[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
