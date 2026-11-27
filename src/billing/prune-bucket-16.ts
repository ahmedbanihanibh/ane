// billing: prune a bucket (16)
export type Bucket16 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 248

/** Prune a bucket for the billing area, refusing past LIMIT. */
export function pruneBucket16(input: Bucket16[]): Bucket16[] {
  const seen = new Set<string>()
  const out: Bucket16[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBucket16(input: Bucket16[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
