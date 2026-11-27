// inbox: throttle a snapshot (18)
export type Snapshot18 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 332

/** Throttle a snapshot for the inbox area, refusing past LIMIT. */
export function throttleSnapshot18(input: Snapshot18[]): Snapshot18[] {
  const seen = new Set<string>()
  const out: Snapshot18[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSnapshot18(input: Snapshot18[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
