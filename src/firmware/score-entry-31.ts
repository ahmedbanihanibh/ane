// firmware: score a entry (31)
export type Entry31 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 200

/** Score a entry for the firmware area, refusing past LIMIT. */
export function scoreEntry31(input: Entry31[]): Entry31[] {
  const seen = new Set<string>()
  const out: Entry31[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEntry31(input: Entry31[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
