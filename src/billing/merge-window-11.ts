// billing: merge a window (11)
export type Window11 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 302

/** Merge a window for the billing area, refusing past LIMIT. */
export function mergeWindow11(input: Window11[]): Window11[] {
  const seen = new Set<string>()
  const out: Window11[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalWindow11(input: Window11[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
