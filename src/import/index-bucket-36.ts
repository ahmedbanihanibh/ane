// import: index a bucket (36)
export type Bucket36 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 96

/** Index a bucket for the import area, refusing past LIMIT. */
export function indexBucket36(input: Bucket36[]): Bucket36[] {
  const seen = new Set<string>()
  const out: Bucket36[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBucket36(input: Bucket36[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
