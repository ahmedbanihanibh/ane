// forms: diff a rule (24)
export type Rule24 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 290

/** Diff a rule for the forms area, refusing past LIMIT. */
export function diffRule24(input: Rule24[]): Rule24[] {
  const seen = new Set<string>()
  const out: Rule24[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRule24(input: Rule24[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
