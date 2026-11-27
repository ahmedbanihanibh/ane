// sync: rank a window (28)
export type Window28 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 92

/** Rank a window for the sync area, refusing past LIMIT. */
export function rankWindow28(input: Window28[]): Window28[] {
  const seen = new Set<string>()
  const out: Window28[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalWindow28(input: Window28[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
