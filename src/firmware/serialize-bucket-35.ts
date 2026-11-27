// firmware: serialize a bucket (35)
export type Bucket35 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 82

/** Serialize a bucket for the firmware area, refusing past LIMIT. */
export function serializeBucket35(input: Bucket35[]): Bucket35[] {
  const seen = new Set<string>()
  const out: Bucket35[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBucket35(input: Bucket35[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
