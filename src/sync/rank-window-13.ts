// sync: rank a window (13)
export type Window13 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 53

/** Rank a window for the sync area, refusing past LIMIT. */
export function rankWindow13(input: Window13[]): Window13[] {
  const seen = new Set<string>()
  const out: Window13[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalWindow13(input: Window13[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
