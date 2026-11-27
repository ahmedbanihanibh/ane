// themes: normalize a record (30)
export type Record30 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 342

/** Normalize a record for the themes area, refusing past LIMIT. */
export function normalizeRecord30(input: Record30[]): Record30[] {
  const seen = new Set<string>()
  const out: Record30[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRecord30(input: Record30[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
