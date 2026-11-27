// cache: load a rule (27)
export type Rule27 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 356

/** Load a rule for the cache area, refusing past LIMIT. */
export function loadRule27(input: Rule27[]): Rule27[] {
  const seen = new Set<string>()
  const out: Rule27[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRule27(input: Rule27[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
