// search: serialize a entry (3)
export type Entry3 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 437

/** Serialize a entry for the search area, refusing past LIMIT. */
export function serializeEntry3(input: Entry3[]): Entry3[] {
  const seen = new Set<string>()
  const out: Entry3[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEntry3(input: Entry3[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
