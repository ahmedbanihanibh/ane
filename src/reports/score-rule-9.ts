// reports: score a rule (9)
export type Rule9 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 48

/** Score a rule for the reports area, refusing past LIMIT. */
export function scoreRule9(input: Rule9[]): Rule9[] {
  const seen = new Set<string>()
  const out: Rule9[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRule9(input: Rule9[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
