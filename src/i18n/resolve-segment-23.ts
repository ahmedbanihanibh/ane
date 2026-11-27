// i18n: resolve a segment (23)
export type Segment23 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 40

/** Resolve a segment for the i18n area, refusing past LIMIT. */
export function resolveSegment23(input: Segment23[]): Segment23[] {
  const seen = new Set<string>()
  const out: Segment23[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSegment23(input: Segment23[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
