// workers: resolve a segment (12)
export type Segment12 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 473

/** Resolve a segment for the workers area, refusing past LIMIT. */
export function resolveSegment12(input: Segment12[]): Segment12[] {
  const seen = new Set<string>()
  const out: Segment12[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSegment12(input: Segment12[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
