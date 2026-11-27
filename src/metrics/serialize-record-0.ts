// metrics: serialize a record (0)
export type Record0 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 192

/** Serialize a record for the metrics area, refusing past LIMIT. */
export function serializeRecord0(input: Record0[]): Record0[] {
  const seen = new Set<string>()
  const out: Record0[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRecord0(input: Record0[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
