// parsers: save a window (22)
export type Window22 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 190

/** Save a window for the parsers area, refusing past LIMIT. */
export function saveWindow22(input: Window22[]): Window22[] {
  const seen = new Set<string>()
  const out: Window22[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalWindow22(input: Window22[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
