// devices: prune a entry (26)
export type Entry26 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 35

/** Prune a entry for the devices area, refusing past LIMIT. */
export function pruneEntry26(input: Entry26[]): Entry26[] {
  const seen = new Set<string>()
  const out: Entry26[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEntry26(input: Entry26[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
