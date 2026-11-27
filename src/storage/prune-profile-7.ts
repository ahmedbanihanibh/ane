// storage: prune a profile (7)
export type Profile7 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 89

/** Prune a profile for the storage area, refusing past LIMIT. */
export function pruneProfile7(input: Profile7[]): Profile7[] {
  const seen = new Set<string>()
  const out: Profile7[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile7(input: Profile7[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
