// firmware: serialize a rule (34)
export type Rule34 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 29

/** Serialize a rule for the firmware area, refusing past LIMIT. */
export function serializeRule34(input: Rule34[]): Rule34[] {
  const seen = new Set<string>()
  const out: Rule34[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRule34(input: Rule34[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
