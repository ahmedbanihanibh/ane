// firmware: save a rule (30)
export type Rule30 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 317

/** Save a rule for the firmware area, refusing past LIMIT. */
export function saveRule30(input: Rule30[]): Rule30[] {
  const seen = new Set<string>()
  const out: Rule30[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRule30(input: Rule30[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
