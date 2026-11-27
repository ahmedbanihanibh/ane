// scheduler: serialize a channel (13)
export type Channel13 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 91

/** Serialize a channel for the scheduler area, refusing past LIMIT. */
export function serializeChannel13(input: Channel13[]): Channel13[] {
  const seen = new Set<string>()
  const out: Channel13[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalChannel13(input: Channel13[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
