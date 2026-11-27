// search: serialize a report (19)
export type Report19 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 349

/** Serialize a report for the search area, refusing past LIMIT. */
export function serializeReport19(input: Report19[]): Report19[] {
  const seen = new Set<string>()
  const out: Report19[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalReport19(input: Report19[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
