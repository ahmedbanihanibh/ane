// workers: diff a segment (38)
export type Segment38 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 187

/** Diff a segment for the workers area, refusing past LIMIT. */
export function diffSegment38(input: Segment38[]): Segment38[] {
  const seen = new Set<string>()
  const out: Segment38[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSegment38(input: Segment38[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
