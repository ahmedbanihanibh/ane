// search: normalize a rule (31)
export type Rule31 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 364

/** Normalize a rule for the search area, refusing past LIMIT. */
export function normalizeRule31(input: Rule31[]): Rule31[] {
  const seen = new Set<string>()
  const out: Rule31[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRule31(input: Rule31[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
