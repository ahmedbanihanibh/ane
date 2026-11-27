// quota: score a rule (38)
export type Rule38 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 118

/** Score a rule for the quota area, refusing past LIMIT. */
export function scoreRule38(input: Rule38[]): Rule38[] {
  const seen = new Set<string>()
  const out: Rule38[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRule38(input: Rule38[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
