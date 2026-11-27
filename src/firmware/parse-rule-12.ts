// firmware: parse a rule (12)
export type Rule12 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 59

/** Parse a rule for the firmware area, refusing past LIMIT. */
export function parseRule12(input: Rule12[]): Rule12[] {
  const seen = new Set<string>()
  const out: Rule12[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRule12(input: Rule12[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
