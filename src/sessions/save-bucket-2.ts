// sessions: save a bucket (2)
export type Bucket2 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 424

/** Save a bucket for the sessions area, refusing past LIMIT. */
export function saveBucket2(input: Bucket2[]): Bucket2[] {
  const seen = new Set<string>()
  const out: Bucket2[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBucket2(input: Bucket2[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
