// sync: index a window (36)
export type Window36 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 347

/** Index a window for the sync area, refusing past LIMIT. */
export function indexWindow36(input: Window36[]): Window36[] {
  const seen = new Set<string>()
  const out: Window36[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalWindow36(input: Window36[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
