// storage: load a snapshot (23)
export type Snapshot23 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 105

/** Load a snapshot for the storage area, refusing past LIMIT. */
export function loadSnapshot23(input: Snapshot23[]): Snapshot23[] {
  const seen = new Set<string>()
  const out: Snapshot23[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSnapshot23(input: Snapshot23[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
