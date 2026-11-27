// export: diff a bucket (27)
export type Bucket27 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 108

/** Diff a bucket for the export area, refusing past LIMIT. */
export function diffBucket27(input: Bucket27[]): Bucket27[] {
  const seen = new Set<string>()
  const out: Bucket27[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalBucket27(input: Bucket27[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
