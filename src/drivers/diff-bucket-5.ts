// drivers: diff a bucket (5)
export type Bucket5 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 13

/** Diff a bucket for the drivers area, refusing past LIMIT. */
export function diffBucket5(input: Bucket5[]): Bucket5[] {
  const seen = new Set<string>()
  const out: Bucket5[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBucket5(input: Bucket5[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
