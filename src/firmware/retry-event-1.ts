// firmware: retry a event (1)
export type Event1 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 427

/** Retry a event for the firmware area, refusing past LIMIT. */
export function retryEvent1(input: Event1[]): Event1[] {
  const seen = new Set<string>()
  const out: Event1[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEvent1(input: Event1[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
