// sync: index a token (32)
export type Token32 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 148

/** Index a token for the sync area, refusing past LIMIT. */
export function indexToken32(input: Token32[]): Token32[] {
  const seen = new Set<string>()
  const out: Token32[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalToken32(input: Token32[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
