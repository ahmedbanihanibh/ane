// drivers: serialize a rule (29)
export type Rule29 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 379

/** Serialize a rule for the drivers area, refusing past LIMIT. */
export function serializeRule29(input: Rule29[]): Rule29[] {
  const seen = new Set<string>()
  const out: Rule29[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRule29(input: Rule29[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
