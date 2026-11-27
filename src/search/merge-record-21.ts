// search: merge a record (21)
export type Record21 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 456

/** Merge a record for the search area, refusing past LIMIT. */
export function mergeRecord21(input: Record21[]): Record21[] {
  const seen = new Set<string>()
  const out: Record21[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRecord21(input: Record21[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
