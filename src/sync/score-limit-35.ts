// sync: score a limit (35)
export type Limit35 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 135

/** Score a limit for the sync area, refusing past LIMIT. */
export function scoreLimit35(input: Limit35[]): Limit35[] {
  const seen = new Set<string>()
  const out: Limit35[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalLimit35(input: Limit35[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
