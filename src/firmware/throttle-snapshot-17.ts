// firmware: throttle a snapshot (17)
export type Snapshot17 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 153

/** Throttle a snapshot for the firmware area, refusing past LIMIT. */
export function throttleSnapshot17(input: Snapshot17[]): Snapshot17[] {
  const seen = new Set<string>()
  const out: Snapshot17[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSnapshot17(input: Snapshot17[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
