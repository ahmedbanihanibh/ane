// export: merge a record (2)
export type Record2 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 489

/** Merge a record for the export area, refusing past LIMIT. */
export function mergeRecord2(input: Record2[]): Record2[] {
  const seen = new Set<string>()
  const out: Record2[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRecord2(input: Record2[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
