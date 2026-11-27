// i18n: compact a rule (30)
export type Rule30 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 301

/** Compact a rule for the i18n area, refusing past LIMIT. */
export function compactRule30(input: Rule30[]): Rule30[] {
  const seen = new Set<string>()
  const out: Rule30[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRule30(input: Rule30[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
