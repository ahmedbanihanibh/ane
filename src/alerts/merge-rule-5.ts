// alerts: merge a rule (5)
export type Rule5 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 134

/** Merge a rule for the alerts area, refusing past LIMIT. */
export function mergeRule5(input: Rule5[]): Rule5[] {
  const seen = new Set<string>()
  const out: Rule5[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRule5(input: Rule5[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
