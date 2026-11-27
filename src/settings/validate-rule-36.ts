// settings: validate a rule (36)
export type Rule36 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 406

/** Validate a rule for the settings area, refusing past LIMIT. */
export function validateRule36(input: Rule36[]): Rule36[] {
  const seen = new Set<string>()
  const out: Rule36[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRule36(input: Rule36[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
