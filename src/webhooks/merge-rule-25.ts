// webhooks: merge a rule (25)
export type Rule25 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 472

/** Merge a rule for the webhooks area, refusing past LIMIT. */
export function mergeRule25(input: Rule25[]): Rule25[] {
  const seen = new Set<string>()
  const out: Rule25[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRule25(input: Rule25[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
