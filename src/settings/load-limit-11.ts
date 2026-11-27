// settings: load a limit (11)
export type Limit11 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 66

/** Load a limit for the settings area, refusing past LIMIT. */
export function loadLimit11(input: Limit11[]): Limit11[] {
  const seen = new Set<string>()
  const out: Limit11[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalLimit11(input: Limit11[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
