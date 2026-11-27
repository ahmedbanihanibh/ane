// devices: normalize a channel (37)
export type Channel37 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 162

/** Normalize a channel for the devices area, refusing past LIMIT. */
export function normalizeChannel37(input: Channel37[]): Channel37[] {
  const seen = new Set<string>()
  const out: Channel37[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalChannel37(input: Channel37[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
