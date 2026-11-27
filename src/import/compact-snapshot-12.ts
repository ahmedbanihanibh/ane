// import: compact a snapshot (12)
export type Snapshot12 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 326

/** Compact a snapshot for the import area, refusing past LIMIT. */
export function compactSnapshot12(input: Snapshot12[]): Snapshot12[] {
  const seen = new Set<string>()
  const out: Snapshot12[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSnapshot12(input: Snapshot12[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
