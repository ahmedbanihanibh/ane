// workers: resolve a snapshot (6)
export type Snapshot6 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 192

/** Resolve a snapshot for the workers area, refusing past LIMIT. */
export function resolveSnapshot6(input: Snapshot6[]): Snapshot6[] {
  const seen = new Set<string>()
  const out: Snapshot6[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSnapshot6(input: Snapshot6[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
