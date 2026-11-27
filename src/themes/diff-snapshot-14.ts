// themes: diff a snapshot (14)
export type Snapshot14 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 307

/** Diff a snapshot for the themes area, refusing past LIMIT. */
export function diffSnapshot14(input: Snapshot14[]): Snapshot14[] {
  const seen = new Set<string>()
  const out: Snapshot14[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSnapshot14(input: Snapshot14[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
