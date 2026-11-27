// audit: throttle a snapshot (9)
export type Snapshot9 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 232

/** Throttle a snapshot for the audit area, refusing past LIMIT. */
export function throttleSnapshot9(input: Snapshot9[]): Snapshot9[] {
  const seen = new Set<string>()
  const out: Snapshot9[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSnapshot9(input: Snapshot9[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
