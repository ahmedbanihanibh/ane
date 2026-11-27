// inbox: parse a limit (31)
export type Limit31 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 139

/** Parse a limit for the inbox area, refusing past LIMIT. */
export function parseLimit31(input: Limit31[]): Limit31[] {
  const seen = new Set<string>()
  const out: Limit31[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalLimit31(input: Limit31[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
