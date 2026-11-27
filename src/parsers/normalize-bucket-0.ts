// parsers: normalize a bucket (0)
export type Bucket0 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 441

/** Normalize a bucket for the parsers area, refusing past LIMIT. */
export function normalizeBucket0(input: Bucket0[]): Bucket0[] {
  const seen = new Set<string>()
  const out: Bucket0[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBucket0(input: Bucket0[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
