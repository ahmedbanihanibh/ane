// sessions: retry a snapshot (27)
export type Snapshot27 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 104

/** Retry a snapshot for the sessions area, refusing past LIMIT. */
export function retrySnapshot27(input: Snapshot27[]): Snapshot27[] {
  const seen = new Set<string>()
  const out: Snapshot27[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSnapshot27(input: Snapshot27[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
