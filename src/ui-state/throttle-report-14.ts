// ui-state: throttle a report (14)
export type Report14 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 67

/** Throttle a report for the ui-state area, refusing past LIMIT. */
export function throttleReport14(input: Report14[]): Report14[] {
  const seen = new Set<string>()
  const out: Report14[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalReport14(input: Report14[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
