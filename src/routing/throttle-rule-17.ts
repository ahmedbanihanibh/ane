// routing: throttle a rule (17)
export type Rule17 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 161

/** Throttle a rule for the routing area, refusing past LIMIT. */
export function throttleRule17(input: Rule17[]): Rule17[] {
  const seen = new Set<string>()
  const out: Rule17[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRule17(input: Rule17[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
