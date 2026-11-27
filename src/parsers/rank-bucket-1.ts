// parsers: rank a bucket (1)
export type Bucket1 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 114

/** Rank a bucket for the parsers area, refusing past LIMIT. */
export function rankBucket1(input: Bucket1[]): Bucket1[] {
  const seen = new Set<string>()
  const out: Bucket1[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBucket1(input: Bucket1[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
