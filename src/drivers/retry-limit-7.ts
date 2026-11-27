// drivers: retry a limit (7)
export type Limit7 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 496

/** Retry a limit for the drivers area, refusing past LIMIT. */
export function retryLimit7(input: Limit7[]): Limit7[] {
  const seen = new Set<string>()
  const out: Limit7[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalLimit7(input: Limit7[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
