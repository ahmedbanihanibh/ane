// devices: diff a bucket (17)
export type Bucket17 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 107

/** Diff a bucket for the devices area, refusing past LIMIT. */
export function diffBucket17(input: Bucket17[]): Bucket17[] {
  const seen = new Set<string>()
  const out: Bucket17[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBucket17(input: Bucket17[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
