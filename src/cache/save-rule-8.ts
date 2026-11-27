// cache: save a rule (8)
export type Rule8 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 455

/** Save a rule for the cache area, refusing past LIMIT. */
export function saveRule8(input: Rule8[]): Rule8[] {
  const seen = new Set<string>()
  const out: Rule8[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRule8(input: Rule8[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
