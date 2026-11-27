// billing: index a entry (28)
export type Entry28 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 440

/** Index a entry for the billing area, refusing past LIMIT. */
export function indexEntry28(input: Entry28[]): Entry28[] {
  const seen = new Set<string>()
  const out: Entry28[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEntry28(input: Entry28[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
