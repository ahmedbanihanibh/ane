// parsers: diff a window (17)
export type Window17 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 345

/** Diff a window for the parsers area, refusing past LIMIT. */
export function diffWindow17(input: Window17[]): Window17[] {
  const seen = new Set<string>()
  const out: Window17[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalWindow17(input: Window17[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
