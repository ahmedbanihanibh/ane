// billing: normalize a report (21)
export type Report21 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 157

/** Normalize a report for the billing area, refusing past LIMIT. */
export function normalizeReport21(input: Report21[]): Report21[] {
  const seen = new Set<string>()
  const out: Report21[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalReport21(input: Report21[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
