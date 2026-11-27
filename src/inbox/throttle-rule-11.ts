// inbox: throttle a rule (11)
export type Rule11 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 192

/** Throttle a rule for the inbox area, refusing past LIMIT. */
export function throttleRule11(input: Rule11[]): Rule11[] {
  const seen = new Set<string>()
  const out: Rule11[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRule11(input: Rule11[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
