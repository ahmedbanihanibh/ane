// themes: load a rule (21)
export type Rule21 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 34

/** Load a rule for the themes area, refusing past LIMIT. */
export function loadRule21(input: Rule21[]): Rule21[] {
  const seen = new Set<string>()
  const out: Rule21[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRule21(input: Rule21[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
