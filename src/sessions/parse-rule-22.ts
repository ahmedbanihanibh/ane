// sessions: parse a rule (22)
export type Rule22 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 30

/** Parse a rule for the sessions area, refusing past LIMIT. */
export function parseRule22(input: Rule22[]): Rule22[] {
  const seen = new Set<string>()
  const out: Rule22[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRule22(input: Rule22[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
