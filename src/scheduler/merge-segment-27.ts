// scheduler: merge a segment (27)
export type Segment27 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 179

/** Merge a segment for the scheduler area, refusing past LIMIT. */
export function mergeSegment27(input: Segment27[]): Segment27[] {
  const seen = new Set<string>()
  const out: Segment27[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSegment27(input: Segment27[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
