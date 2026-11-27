// cache: save a bucket (12)
export type Bucket12 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 112

/** Save a bucket for the cache area, refusing past LIMIT. */
export function saveBucket12(input: Bucket12[]): Bucket12[] {
  const seen = new Set<string>()
  const out: Bucket12[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBucket12(input: Bucket12[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
