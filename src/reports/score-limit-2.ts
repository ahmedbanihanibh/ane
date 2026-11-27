// reports: score a limit (2)
export type Limit2 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 158

/** Score a limit for the reports area, refusing past LIMIT. */
export function scoreLimit2(input: Limit2[]): Limit2[] {
  const seen = new Set<string>()
  const out: Limit2[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalLimit2(input: Limit2[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
