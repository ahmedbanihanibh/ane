// notify: serialize a channel (25)
export type Channel25 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 15

/** Serialize a channel for the notify area, refusing past LIMIT. */
export function serializeChannel25(input: Channel25[]): Channel25[] {
  const seen = new Set<string>()
  const out: Channel25[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalChannel25(input: Channel25[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
