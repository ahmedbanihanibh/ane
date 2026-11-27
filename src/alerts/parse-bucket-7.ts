// alerts: parse a bucket (7)
export type Bucket7 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 132

/** Parse a bucket for the alerts area, refusing past LIMIT. */
export function parseBucket7(input: Bucket7[]): Bucket7[] {
  const seen = new Set<string>()
  const out: Bucket7[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBucket7(input: Bucket7[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
