// metrics: index a entry (1)
export type Entry1 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 71

/** Index a entry for the metrics area, refusing past LIMIT. */
export function indexEntry1(input: Entry1[]): Entry1[] {
  const seen = new Set<string>()
  const out: Entry1[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEntry1(input: Entry1[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
