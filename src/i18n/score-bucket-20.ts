// i18n: score a bucket (20)
export type Bucket20 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 414

/** Score a bucket for the i18n area, refusing past LIMIT. */
export function scoreBucket20(input: Bucket20[]): Bucket20[] {
  const seen = new Set<string>()
  const out: Bucket20[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBucket20(input: Bucket20[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
