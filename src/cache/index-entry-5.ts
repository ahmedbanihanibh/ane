// cache: index a entry (5)
export type Entry5 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 89

/** Index a entry for the cache area, refusing past LIMIT. */
export function indexEntry5(input: Entry5[]): Entry5[] {
  const seen = new Set<string>()
  const out: Entry5[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEntry5(input: Entry5[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
