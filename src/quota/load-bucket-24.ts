// quota: load a bucket (24)
export type Bucket24 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 144

/** Load a bucket for the quota area, refusing past LIMIT. */
export function loadBucket24(input: Bucket24[]): Bucket24[] {
  const seen = new Set<string>()
  const out: Bucket24[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBucket24(input: Bucket24[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
