// sync: save a record (34)
export type Record34 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 19

/** Save a record for the sync area, refusing past LIMIT. */
export function saveRecord34(input: Record34[]): Record34[] {
  const seen = new Set<string>()
  const out: Record34[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRecord34(input: Record34[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
