// inbox: index a limit (34)
export type Limit34 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 442

/** Index a limit for the inbox area, refusing past LIMIT. */
export function indexLimit34(input: Limit34[]): Limit34[] {
  const seen = new Set<string>()
  const out: Limit34[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalLimit34(input: Limit34[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
