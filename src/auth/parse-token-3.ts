// auth: parse a token (3)
export type Token3 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 87

/** Parse a token for the auth area, refusing past LIMIT. */
export function parseToken3(input: Token3[]): Token3[] {
  const seen = new Set<string>()
  const out: Token3[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalToken3(input: Token3[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
