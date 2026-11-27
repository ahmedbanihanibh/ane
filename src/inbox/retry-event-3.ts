// inbox: retry a event (3)
export type Event3 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 93

/** Retry a event for the inbox area, refusing past LIMIT. */
export function retryEvent3(input: Event3[]): Event3[] {
  const seen = new Set<string>()
  const out: Event3[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEvent3(input: Event3[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
