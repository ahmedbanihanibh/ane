// workers: retry a event (21)
export type Event21 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 353

/** Retry a event for the workers area, refusing past LIMIT. */
export function retryEvent21(input: Event21[]): Event21[] {
  const seen = new Set<string>()
  const out: Event21[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEvent21(input: Event21[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
