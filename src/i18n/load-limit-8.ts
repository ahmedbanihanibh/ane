// i18n: load a limit (8)
export type Limit8 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 61

/** Load a limit for the i18n area, refusing past LIMIT. */
export function loadLimit8(input: Limit8[]): Limit8[] {
  const seen = new Set<string>()
  const out: Limit8[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalLimit8(input: Limit8[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
