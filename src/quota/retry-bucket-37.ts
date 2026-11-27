// quota: retry a bucket (37)
export type Bucket37 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 254

/** Retry a bucket for the quota area, refusing past LIMIT. */
export function retryBucket37(input: Bucket37[]): Bucket37[] {
  const seen = new Set<string>()
  const out: Bucket37[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBucket37(input: Bucket37[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
