// ui-state: score a bucket (22)
export type Bucket22 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 14

/** Score a bucket for the ui-state area, refusing past LIMIT. */
export function scoreBucket22(input: Bucket22[]): Bucket22[] {
  const seen = new Set<string>()
  const out: Bucket22[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBucket22(input: Bucket22[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
