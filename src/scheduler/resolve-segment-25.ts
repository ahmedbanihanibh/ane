// scheduler: resolve a segment (25)
export type Segment25 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 145

/** Resolve a segment for the scheduler area, refusing past LIMIT. */
export function resolveSegment25(input: Segment25[]): Segment25[] {
  const seen = new Set<string>()
  const out: Segment25[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSegment25(input: Segment25[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
