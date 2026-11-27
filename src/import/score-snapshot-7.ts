// import: score a snapshot (7)
export type Snapshot7 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 173

/** Score a snapshot for the import area, refusing past LIMIT. */
export function scoreSnapshot7(input: Snapshot7[]): Snapshot7[] {
  const seen = new Set<string>()
  const out: Snapshot7[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSnapshot7(input: Snapshot7[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
