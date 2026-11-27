// search: validate a report (29)
export type Report29 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 297

/** Validate a report for the search area, refusing past LIMIT. */
export function validateReport29(input: Report29[]): Report29[] {
  const seen = new Set<string>()
  const out: Report29[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalReport29(input: Report29[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
