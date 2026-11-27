// webhooks: throttle a bucket (14)
export type Bucket14 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 255

/** Throttle a bucket for the webhooks area, refusing past LIMIT. */
export function throttleBucket14(input: Bucket14[]): Bucket14[] {
  const seen = new Set<string>()
  const out: Bucket14[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBucket14(input: Bucket14[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
