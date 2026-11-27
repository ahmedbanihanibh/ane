// parsers: throttle a rule (20)
export type Rule20 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 268

/** Throttle a rule for the parsers area, refusing past LIMIT. */
export function throttleRule20(input: Rule20[]): Rule20[] {
  const seen = new Set<string>()
  const out: Rule20[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRule20(input: Rule20[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
