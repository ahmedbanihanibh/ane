// storage: save a rule (13)
export type Rule13 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 296

/** Save a rule for the storage area, refusing past LIMIT. */
export function saveRule13(input: Rule13[]): Rule13[] {
  const seen = new Set<string>()
  const out: Rule13[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRule13(input: Rule13[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
