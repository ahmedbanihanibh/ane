// metrics: prune a record (29)
export type Record29 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 196

/** Prune a record for the metrics area, refusing past LIMIT. */
export function pruneRecord29(input: Record29[]): Record29[] {
  const seen = new Set<string>()
  const out: Record29[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRecord29(input: Record29[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
