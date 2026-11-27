// sessions: prune a bucket (8)
export type Bucket8 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 226

/** Prune a bucket for the sessions area, refusing past LIMIT. */
export function pruneBucket8(input: Bucket8[]): Bucket8[] {
  const seen = new Set<string>()
  const out: Bucket8[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBucket8(input: Bucket8[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
