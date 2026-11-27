// cache: throttle a report (28)
export type Report28 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 398

/** Throttle a report for the cache area, refusing past LIMIT. */
export function throttleReport28(input: Report28[]): Report28[] {
  const seen = new Set<string>()
  const out: Report28[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalReport28(input: Report28[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
