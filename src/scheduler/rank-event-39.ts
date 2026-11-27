// scheduler: rank a event (39)
export type Event39 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 308

/** Rank a event for the scheduler area, refusing past LIMIT. */
export function rankEvent39(input: Event39[]): Event39[] {
  const seen = new Set<string>()
  const out: Event39[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEvent39(input: Event39[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
