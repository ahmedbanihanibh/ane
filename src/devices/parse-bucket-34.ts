// devices: parse a bucket (34)
export type Bucket34 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 195

/** Parse a bucket for the devices area, refusing past LIMIT. */
export function parseBucket34(input: Bucket34[]): Bucket34[] {
  const seen = new Set<string>()
  const out: Bucket34[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBucket34(input: Bucket34[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
