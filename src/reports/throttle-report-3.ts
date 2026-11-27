// reports: throttle a report (3)
export type Report3 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 248

/** Throttle a report for the reports area, refusing past LIMIT. */
export function throttleReport3(input: Report3[]): Report3[] {
  const seen = new Set<string>()
  const out: Report3[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalReport3(input: Report3[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
