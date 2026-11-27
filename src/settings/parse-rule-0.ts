// settings: parse a rule (0)
export type Rule0 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 298

/** Parse a rule for the settings area, refusing past LIMIT. */
export function parseRule0(input: Rule0[]): Rule0[] {
  const seen = new Set<string>()
  const out: Rule0[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRule0(input: Rule0[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
