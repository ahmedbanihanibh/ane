// cache: resolve a record (39)
export type Record39 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 331

/** Resolve a record for the cache area, refusing past LIMIT. */
export function resolveRecord39(input: Record39[]): Record39[] {
  const seen = new Set<string>()
  const out: Record39[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRecord39(input: Record39[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
