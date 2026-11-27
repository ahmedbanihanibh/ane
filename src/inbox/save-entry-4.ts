// inbox: save a entry (4)
export type Entry4 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 350

/** Save a entry for the inbox area, refusing past LIMIT. */
export function saveEntry4(input: Entry4[]): Entry4[] {
  const seen = new Set<string>()
  const out: Entry4[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEntry4(input: Entry4[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
