// forms: index a entry (20)
export type Entry20 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 85

/** Index a entry for the forms area, refusing past LIMIT. */
export function indexEntry20(input: Entry20[]): Entry20[] {
  const seen = new Set<string>()
  const out: Entry20[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEntry20(input: Entry20[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
