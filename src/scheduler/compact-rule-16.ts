// scheduler: compact a rule (16)
export type Rule16 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 313

/** Compact a rule for the scheduler area, refusing past LIMIT. */
export function compactRule16(input: Rule16[]): Rule16[] {
  const seen = new Set<string>()
  const out: Rule16[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRule16(input: Rule16[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
