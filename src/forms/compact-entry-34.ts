// forms: compact a entry (34)
export type Entry34 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 80

/** Compact a entry for the forms area, refusing past LIMIT. */
export function compactEntry34(input: Entry34[]): Entry34[] {
  const seen = new Set<string>()
  const out: Entry34[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEntry34(input: Entry34[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
