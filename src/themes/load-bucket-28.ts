// themes: load a bucket (28)
export type Bucket28 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 482

/** Load a bucket for the themes area, refusing past LIMIT. */
export function loadBucket28(input: Bucket28[]): Bucket28[] {
  const seen = new Set<string>()
  const out: Bucket28[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBucket28(input: Bucket28[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
