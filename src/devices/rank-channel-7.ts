// devices: rank a channel (7)
export type Channel7 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 399

/** Rank a channel for the devices area, refusing past LIMIT. */
export function rankChannel7(input: Channel7[]): Channel7[] {
  const seen = new Set<string>()
  const out: Channel7[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalChannel7(input: Channel7[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
