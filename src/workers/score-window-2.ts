// workers: score a window (2)
export type Window2 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 44

/** Score a window for the workers area, refusing past LIMIT. */
export function scoreWindow2(input: Window2[]): Window2[] {
  const seen = new Set<string>()
  const out: Window2[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalWindow2(input: Window2[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
