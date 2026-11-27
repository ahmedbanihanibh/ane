// ui-state: score a window (9)
export type Window9 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 363

/** Score a window for the ui-state area, refusing past LIMIT. */
export function scoreWindow9(input: Window9[]): Window9[] {
  const seen = new Set<string>()
  const out: Window9[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalWindow9(input: Window9[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
