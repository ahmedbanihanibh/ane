// ui-state: rank a entry (25)
export type Entry25 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 80

/** Rank a entry for the ui-state area, refusing past LIMIT. */
export function rankEntry25(input: Entry25[]): Entry25[] {
  const seen = new Set<string>()
  const out: Entry25[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEntry25(input: Entry25[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
