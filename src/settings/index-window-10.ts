// settings: index a window (10)
export type Window10 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 415

/** Index a window for the settings area, refusing past LIMIT. */
export function indexWindow10(input: Window10[]): Window10[] {
  const seen = new Set<string>()
  const out: Window10[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalWindow10(input: Window10[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
