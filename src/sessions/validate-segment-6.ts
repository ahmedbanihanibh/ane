// sessions: validate a segment (6)
export type Segment6 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 184

/** Validate a segment for the sessions area, refusing past LIMIT. */
export function validateSegment6(input: Segment6[]): Segment6[] {
  const seen = new Set<string>()
  const out: Segment6[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSegment6(input: Segment6[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
