// ui-state: rank a segment (32)
export type Segment32 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 79

/** Rank a segment for the ui-state area, refusing past LIMIT. */
export function rankSegment32(input: Segment32[]): Segment32[] {
  const seen = new Set<string>()
  const out: Segment32[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSegment32(input: Segment32[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
