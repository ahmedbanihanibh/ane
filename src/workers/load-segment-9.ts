// workers: load a segment (9)
export type Segment9 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 357

/** Load a segment for the workers area, refusing past LIMIT. */
export function loadSegment9(input: Segment9[]): Segment9[] {
  const seen = new Set<string>()
  const out: Segment9[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSegment9(input: Segment9[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
