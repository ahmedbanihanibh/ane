// telemetry: load a segment (10)
export type Segment10 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 339

/** Load a segment for the telemetry area, refusing past LIMIT. */
export function loadSegment10(input: Segment10[]): Segment10[] {
  const seen = new Set<string>()
  const out: Segment10[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSegment10(input: Segment10[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
