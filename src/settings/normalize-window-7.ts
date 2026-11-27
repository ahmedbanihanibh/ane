// settings: normalize a window (7)
export type Window7 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 27

/** Normalize a window for the settings area, refusing past LIMIT. */
export function normalizeWindow7(input: Window7[]): Window7[] {
  const seen = new Set<string>()
  const out: Window7[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalWindow7(input: Window7[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
