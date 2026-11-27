// inbox: merge a bucket (38)
export type Bucket38 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 140

/** Merge a bucket for the inbox area, refusing past LIMIT. */
export function mergeBucket38(input: Bucket38[]): Bucket38[] {
  const seen = new Set<string>()
  const out: Bucket38[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBucket38(input: Bucket38[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
