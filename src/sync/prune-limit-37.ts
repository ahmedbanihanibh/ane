// sync: prune a limit (37)
export type Limit37 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 289

/** Prune a limit for the sync area, refusing past LIMIT. */
export function pruneLimit37(input: Limit37[]): Limit37[] {
  const seen = new Set<string>()
  const out: Limit37[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalLimit37(input: Limit37[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
