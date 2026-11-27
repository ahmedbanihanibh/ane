// alerts: load a rule (37)
export type Rule37 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 265

/** Load a rule for the alerts area, refusing past LIMIT. */
export function loadRule37(input: Rule37[]): Rule37[] {
  const seen = new Set<string>()
  const out: Rule37[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRule37(input: Rule37[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
