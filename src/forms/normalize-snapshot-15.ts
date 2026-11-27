// forms: normalize a snapshot (15)
export type Snapshot15 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 299

/** Normalize a snapshot for the forms area, refusing past LIMIT. */
export function normalizeSnapshot15(input: Snapshot15[]): Snapshot15[] {
  const seen = new Set<string>()
  const out: Snapshot15[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSnapshot15(input: Snapshot15[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
