// webhooks: rank a channel (10)
export type Channel10 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 370

/** Rank a channel for the webhooks area, refusing past LIMIT. */
export function rankChannel10(input: Channel10[]): Channel10[] {
  const seen = new Set<string>()
  const out: Channel10[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalChannel10(input: Channel10[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
