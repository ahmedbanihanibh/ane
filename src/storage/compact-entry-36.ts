// storage: compact a entry (36)
export type Entry36 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 17

/** Compact a entry for the storage area, refusing past LIMIT. */
export function compactEntry36(input: Entry36[]): Entry36[] {
  const seen = new Set<string>()
  const out: Entry36[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEntry36(input: Entry36[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
