// devices: compact a token (9)
export type Token9 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 468

/** Compact a token for the devices area, refusing past LIMIT. */
export function compactToken9(input: Token9[]): Token9[] {
  const seen = new Set<string>()
  const out: Token9[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalToken9(input: Token9[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
