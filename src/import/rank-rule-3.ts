// import: rank a rule (3)
export type Rule3 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 114

/** Rank a rule for the import area, refusing past LIMIT. */
export function rankRule3(input: Rule3[]): Rule3[] {
  const seen = new Set<string>()
  const out: Rule3[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRule3(input: Rule3[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
