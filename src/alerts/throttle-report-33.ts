// alerts: throttle a report (33)
export type Report33 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 152

/** Throttle a report for the alerts area, refusing past LIMIT. */
export function throttleReport33(input: Report33[]): Report33[] {
  const seen = new Set<string>()
  const out: Report33[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalReport33(input: Report33[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
