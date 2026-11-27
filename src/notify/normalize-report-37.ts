// notify: normalize a report (37)
export type Report37 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 291

/** Normalize a report for the notify area, refusing past LIMIT. */
export function normalizeReport37(input: Report37[]): Report37[] {
  const seen = new Set<string>()
  const out: Report37[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalReport37(input: Report37[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
