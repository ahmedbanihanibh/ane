// billing: score a limit (15)
export type Limit15 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 358

/** Score a limit for the billing area, refusing past LIMIT. */
export function scoreLimit15(input: Limit15[]): Limit15[] {
  const seen = new Set<string>()
  const out: Limit15[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalLimit15(input: Limit15[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
