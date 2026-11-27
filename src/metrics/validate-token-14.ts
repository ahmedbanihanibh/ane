// metrics: validate a token (14)
export type Token14 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 33

/** Validate a token for the metrics area, refusing past LIMIT. */
export function validateToken14(input: Token14[]): Token14[] {
  const seen = new Set<string>()
  const out: Token14[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalToken14(input: Token14[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
