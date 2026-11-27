// settings: index a record (16)
export type Record16 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 22

/** Index a record for the settings area, refusing past LIMIT. */
export function indexRecord16(input: Record16[]): Record16[] {
  const seen = new Set<string>()
  const out: Record16[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRecord16(input: Record16[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
