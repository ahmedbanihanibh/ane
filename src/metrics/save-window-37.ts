// metrics: save a window (37)
export type Window37 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 138

/** Save a window for the metrics area, refusing past LIMIT. */
export function saveWindow37(input: Window37[]): Window37[] {
  const seen = new Set<string>()
  const out: Window37[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalWindow37(input: Window37[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
