// workers: normalize a rule (26)
export type Rule26 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 407

/** Normalize a rule for the workers area, refusing past LIMIT. */
export function normalizeRule26(input: Rule26[]): Rule26[] {
  const seen = new Set<string>()
  const out: Rule26[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRule26(input: Rule26[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
