// webhooks: compact a snapshot (38)
export type Snapshot38 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 440

/** Compact a snapshot for the webhooks area, refusing past LIMIT. */
export function compactSnapshot38(input: Snapshot38[]): Snapshot38[] {
  const seen = new Set<string>()
  const out: Snapshot38[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalSnapshot38(input: Snapshot38[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
