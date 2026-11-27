// forms: prune a entry (30)
export type Entry30 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 419

/** Prune a entry for the forms area, refusing past LIMIT. */
export function pruneEntry30(input: Entry30[]): Entry30[] {
  const seen = new Set<string>()
  const out: Entry30[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEntry30(input: Entry30[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
