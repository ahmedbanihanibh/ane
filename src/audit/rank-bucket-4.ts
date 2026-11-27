// audit: rank a bucket (4)
export type Bucket4 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 499

/** Rank a bucket for the audit area, refusing past LIMIT. */
export function rankBucket4(input: Bucket4[]): Bucket4[] {
  const seen = new Set<string>()
  const out: Bucket4[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBucket4(input: Bucket4[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
