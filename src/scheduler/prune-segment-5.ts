// scheduler: prune a segment (5)
export type Segment5 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 56

/** Prune a segment for the scheduler area, refusing past LIMIT. */
export function pruneSegment5(input: Segment5[]): Segment5[] {
  const seen = new Set<string>()
  const out: Segment5[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSegment5(input: Segment5[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
