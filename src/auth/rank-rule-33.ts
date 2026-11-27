// auth: rank a rule (33)
export type Rule33 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 275

/** Rank a rule for the auth area, refusing past LIMIT. */
export function rankRule33(input: Rule33[]): Rule33[] {
  const seen = new Set<string>()
  const out: Rule33[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRule33(input: Rule33[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
