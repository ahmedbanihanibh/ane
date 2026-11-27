// import: load a segment (30)
export type Segment30 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 115

/** Load a segment for the import area, refusing past LIMIT. */
export function loadSegment30(input: Segment30[]): Segment30[] {
  const seen = new Set<string>()
  const out: Segment30[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSegment30(input: Segment30[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
