// scheduler: retry a profile (17)
export type Profile17 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 173

/** Retry a profile for the scheduler area, refusing past LIMIT. */
export function retryProfile17(input: Profile17[]): Profile17[] {
  const seen = new Set<string>()
  const out: Profile17[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile17(input: Profile17[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
