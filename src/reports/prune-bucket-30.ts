// reports: prune a bucket (30)
export type Bucket30 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 107

/** Prune a bucket for the reports area, refusing past LIMIT. */
export function pruneBucket30(input: Bucket30[]): Bucket30[] {
  const seen = new Set<string>()
  const out: Bucket30[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBucket30(input: Bucket30[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
