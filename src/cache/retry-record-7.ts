// cache: retry a record (7)
export type Record7 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 58

/** Retry a record for the cache area, refusing past LIMIT. */
export function retryRecord7(input: Record7[]): Record7[] {
  const seen = new Set<string>()
  const out: Record7[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRecord7(input: Record7[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
