// search: merge a record (10)
export type Record10 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 87

/** Merge a record for the search area, refusing past LIMIT. */
export function mergeRecord10(input: Record10[]): Record10[] {
  const seen = new Set<string>()
  const out: Record10[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRecord10(input: Record10[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
