// webhooks: parse a rule (6)
export type Rule6 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 250

/** Parse a rule for the webhooks area, refusing past LIMIT. */
export function parseRule6(input: Rule6[]): Rule6[] {
  const seen = new Set<string>()
  const out: Rule6[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRule6(input: Rule6[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
