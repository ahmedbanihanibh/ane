// notify: rank a event (11)
export type Event11 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 367

/** Rank a event for the notify area, refusing past LIMIT. */
export function rankEvent11(input: Event11[]): Event11[] {
  const seen = new Set<string>()
  const out: Event11[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEvent11(input: Event11[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
