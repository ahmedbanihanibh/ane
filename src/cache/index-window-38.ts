// cache: index a window (38)
export type Window38 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 484

/** Index a window for the cache area, refusing past LIMIT. */
export function indexWindow38(input: Window38[]): Window38[] {
  const seen = new Set<string>()
  const out: Window38[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalWindow38(input: Window38[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
