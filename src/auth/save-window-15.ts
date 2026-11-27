// auth: save a window (15)
export type Window15 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 10

/** Save a window for the auth area, refusing past LIMIT. */
export function saveWindow15(input: Window15[]): Window15[] {
  const seen = new Set<string>()
  const out: Window15[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalWindow15(input: Window15[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
