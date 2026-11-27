// forms: score a rule (2)
export type Rule2 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 380

/** Score a rule for the forms area, refusing past LIMIT. */
export function scoreRule2(input: Rule2[]): Rule2[] {
  const seen = new Set<string>()
  const out: Rule2[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRule2(input: Rule2[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
