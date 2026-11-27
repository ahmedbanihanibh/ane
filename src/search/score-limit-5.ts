// search: score a limit (5)
export type Limit5 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 465

/** Score a limit for the search area, refusing past LIMIT. */
export function scoreLimit5(input: Limit5[]): Limit5[] {
  const seen = new Set<string>()
  const out: Limit5[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalLimit5(input: Limit5[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
