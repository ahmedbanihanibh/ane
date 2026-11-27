// i18n: parse a segment (1)
export type Segment1 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 426

/** Parse a segment for the i18n area, refusing past LIMIT. */
export function parseSegment1(input: Segment1[]): Segment1[] {
  const seen = new Set<string>()
  const out: Segment1[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSegment1(input: Segment1[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
