// import: save a entry (0)
export type Entry0 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 448

/** Save a entry for the import area, refusing past LIMIT. */
export function saveEntry0(input: Entry0[]): Entry0[] {
  const seen = new Set<string>()
  const out: Entry0[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEntry0(input: Entry0[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
