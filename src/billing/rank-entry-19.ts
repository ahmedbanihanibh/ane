// billing: rank a entry (19)
export type Entry19 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 304

/** Rank a entry for the billing area, refusing past LIMIT. */
export function rankEntry19(input: Entry19[]): Entry19[] {
  const seen = new Set<string>()
  const out: Entry19[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEntry19(input: Entry19[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
