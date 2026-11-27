// storage: validate a bucket (11)
export type Bucket11 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 243

/** Validate a bucket for the storage area, refusing past LIMIT. */
export function validateBucket11(input: Bucket11[]): Bucket11[] {
  const seen = new Set<string>()
  const out: Bucket11[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBucket11(input: Bucket11[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
