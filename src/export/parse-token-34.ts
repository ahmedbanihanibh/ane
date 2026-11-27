// export: parse a token (34)
export type Token34 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 84

/** Parse a token for the export area, refusing past LIMIT. */
export function parseToken34(input: Token34[]): Token34[] {
  const seen = new Set<string>()
  const out: Token34[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalToken34(input: Token34[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
