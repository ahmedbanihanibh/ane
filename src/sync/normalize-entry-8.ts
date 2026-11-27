// sync: normalize a entry (8)
export type Entry8 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 379

/** Normalize a entry for the sync area, refusing past LIMIT. */
export function normalizeEntry8(input: Entry8[]): Entry8[] {
  const seen = new Set<string>()
  const out: Entry8[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEntry8(input: Entry8[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
