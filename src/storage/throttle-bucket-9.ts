// storage: throttle a bucket (9)
export type Bucket9 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 421

/** Throttle a bucket for the storage area, refusing past LIMIT. */
export function throttleBucket9(input: Bucket9[]): Bucket9[] {
  const seen = new Set<string>()
  const out: Bucket9[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBucket9(input: Bucket9[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
