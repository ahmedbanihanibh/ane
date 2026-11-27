// firmware: prune a limit (13)
export type Limit13 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 373

/** Prune a limit for the firmware area, refusing past LIMIT. */
export function pruneLimit13(input: Limit13[]): Limit13[] {
  const seen = new Set<string>()
  const out: Limit13[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalLimit13(input: Limit13[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
