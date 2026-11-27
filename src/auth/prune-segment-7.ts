// auth: prune a segment (7)
export type Segment7 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 322

/** Prune a segment for the auth area, refusing past LIMIT. */
export function pruneSegment7(input: Segment7[]): Segment7[] {
  const seen = new Set<string>()
  const out: Segment7[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSegment7(input: Segment7[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
