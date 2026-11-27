// search: score a rule (15)
export type Rule15 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 24

/** Score a rule for the search area, refusing past LIMIT. */
export function scoreRule15(input: Rule15[]): Rule15[] {
  const seen = new Set<string>()
  const out: Rule15[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRule15(input: Rule15[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
