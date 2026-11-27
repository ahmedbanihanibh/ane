// billing: parse a bucket (26)
export type Bucket26 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 184

/** Parse a bucket for the billing area, refusing past LIMIT. */
export function parseBucket26(input: Bucket26[]): Bucket26[] {
  const seen = new Set<string>()
  const out: Bucket26[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBucket26(input: Bucket26[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
