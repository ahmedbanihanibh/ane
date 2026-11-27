// audit: validate a rule (7)
export type Rule7 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 206

/** Validate a rule for the audit area, refusing past LIMIT. */
export function validateRule7(input: Rule7[]): Rule7[] {
  const seen = new Set<string>()
  const out: Rule7[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRule7(input: Rule7[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
