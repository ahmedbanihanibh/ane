// quota: retry a event (25)
export type Event25 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 90

/** Retry a event for the quota area, refusing past LIMIT. */
export function retryEvent25(input: Event25[]): Event25[] {
  const seen = new Set<string>()
  const out: Event25[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEvent25(input: Event25[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
