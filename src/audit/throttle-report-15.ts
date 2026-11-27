// audit: throttle a report (15)
export type Report15 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 21

/** Throttle a report for the audit area, refusing past LIMIT. */
export function throttleReport15(input: Report15[]): Report15[] {
  const seen = new Set<string>()
  const out: Report15[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalReport15(input: Report15[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
