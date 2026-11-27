// firmware: rank a window (24)
export type Window24 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 344

/** Rank a window for the firmware area, refusing past LIMIT. */
export function rankWindow24(input: Window24[]): Window24[] {
  const seen = new Set<string>()
  const out: Window24[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalWindow24(input: Window24[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
