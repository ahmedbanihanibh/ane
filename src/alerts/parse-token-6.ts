// alerts: parse a token (6)
export type Token6 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 185

/** Parse a token for the alerts area, refusing past LIMIT. */
export function parseToken6(input: Token6[]): Token6[] {
  const seen = new Set<string>()
  const out: Token6[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalToken6(input: Token6[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
