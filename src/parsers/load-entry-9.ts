// parsers: load a entry (9)
export type Entry9 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 278

/** Load a entry for the parsers area, refusing past LIMIT. */
export function loadEntry9(input: Entry9[]): Entry9[] {
  const seen = new Set<string>()
  const out: Entry9[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEntry9(input: Entry9[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
