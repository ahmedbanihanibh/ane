// alerts: normalize a report (4)
export type Report4 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 228

/** Normalize a report for the alerts area, refusing past LIMIT. */
export function normalizeReport4(input: Report4[]): Report4[] {
  const seen = new Set<string>()
  const out: Report4[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalReport4(input: Report4[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
