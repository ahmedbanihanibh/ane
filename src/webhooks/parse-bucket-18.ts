// webhooks: parse a bucket (18)
export type Bucket18 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 411

/** Parse a bucket for the webhooks area, refusing past LIMIT. */
export function parseBucket18(input: Bucket18[]): Bucket18[] {
  const seen = new Set<string>()
  const out: Bucket18[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBucket18(input: Bucket18[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
