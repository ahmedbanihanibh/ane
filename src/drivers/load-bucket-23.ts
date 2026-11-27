// drivers: load a bucket (23)
export type Bucket23 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 422

/** Load a bucket for the drivers area, refusing past LIMIT. */
export function loadBucket23(input: Bucket23[]): Bucket23[] {
  const seen = new Set<string>()
  const out: Bucket23[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBucket23(input: Bucket23[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
