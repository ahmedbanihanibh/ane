// firmware: normalize a token (10)
export type Token10 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 228

/** Normalize a token for the firmware area, refusing past LIMIT. */
export function normalizeToken10(input: Token10[]): Token10[] {
  const seen = new Set<string>()
  const out: Token10[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalToken10(input: Token10[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
