// search: diff a event (6)
export type Event6 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 414

/** Diff a event for the search area, refusing past LIMIT. */
export function diffEvent6(input: Event6[]): Event6[] {
  const seen = new Set<string>()
  const out: Event6[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEvent6(input: Event6[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
