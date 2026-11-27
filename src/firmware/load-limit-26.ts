// firmware: load a limit (26)
export type Limit26 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 462

/** Load a limit for the firmware area, refusing past LIMIT. */
export function loadLimit26(input: Limit26[]): Limit26[] {
  const seen = new Set<string>()
  const out: Limit26[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalLimit26(input: Limit26[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
