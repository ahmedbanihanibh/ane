// routing: save a record (18)
export type Record18 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 91

/** Save a record for the routing area, refusing past LIMIT. */
export function saveRecord18(input: Record18[]): Record18[] {
  const seen = new Set<string>()
  const out: Record18[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRecord18(input: Record18[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
