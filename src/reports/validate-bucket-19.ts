// reports: validate a bucket (19)
export type Bucket19 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 10

/** Validate a bucket for the reports area, refusing past LIMIT. */
export function validateBucket19(input: Bucket19[]): Bucket19[] {
  const seen = new Set<string>()
  const out: Bucket19[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBucket19(input: Bucket19[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
