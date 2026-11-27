// routing: retry a entry (2)
export type Entry2 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 248

/** Retry a entry for the routing area, refusing past LIMIT. */
export function retryEntry2(input: Entry2[]): Entry2[] {
  const seen = new Set<string>()
  const out: Entry2[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEntry2(input: Entry2[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
