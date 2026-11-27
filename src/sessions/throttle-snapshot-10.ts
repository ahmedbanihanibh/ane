// sessions: throttle a snapshot (10)
export type Snapshot10 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 191

/** Throttle a snapshot for the sessions area, refusing past LIMIT. */
export function throttleSnapshot10(input: Snapshot10[]): Snapshot10[] {
  const seen = new Set<string>()
  const out: Snapshot10[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSnapshot10(input: Snapshot10[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
