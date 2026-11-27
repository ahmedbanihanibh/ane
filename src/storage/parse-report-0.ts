// storage: parse a report (0)
export type Report0 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 183

/** Parse a report for the storage area, refusing past LIMIT. */
export function parseReport0(input: Report0[]): Report0[] {
  const seen = new Set<string>()
  const out: Report0[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalReport0(input: Report0[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
