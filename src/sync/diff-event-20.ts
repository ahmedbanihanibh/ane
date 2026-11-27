// sync: diff a event (20)
export type Event20 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 468

/** Diff a event for the sync area, refusing past LIMIT. */
export function diffEvent20(input: Event20[]): Event20[] {
  const seen = new Set<string>()
  const out: Event20[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEvent20(input: Event20[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
