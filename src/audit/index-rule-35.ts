// audit: index a rule (35)
export type Rule35 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 360

/** Index a rule for the audit area, refusing past LIMIT. */
export function indexRule35(input: Rule35[]): Rule35[] {
  const seen = new Set<string>()
  const out: Rule35[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRule35(input: Rule35[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
