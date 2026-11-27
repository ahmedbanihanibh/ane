// workers: normalize a report (31)
export type Report31 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 270

/** Normalize a report for the workers area, refusing past LIMIT. */
export function normalizeReport31(input: Report31[]): Report31[] {
  const seen = new Set<string>()
  const out: Report31[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalReport31(input: Report31[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
