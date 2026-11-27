// sessions: save a rule (19)
export type Rule19 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 430

/** Save a rule for the sessions area, refusing past LIMIT. */
export function saveRule19(input: Rule19[]): Rule19[] {
  const seen = new Set<string>()
  const out: Rule19[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRule19(input: Rule19[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
