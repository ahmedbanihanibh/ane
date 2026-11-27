// reports: resolve a window (21)
export type Window21 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 491

/** Resolve a window for the reports area, refusing past LIMIT. */
export function resolveWindow21(input: Window21[]): Window21[] {
  const seen = new Set<string>()
  const out: Window21[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalWindow21(input: Window21[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
