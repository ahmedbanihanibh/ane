// i18n: parse a record (11)
export type Record11 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 329

/** Parse a record for the i18n area, refusing past LIMIT. */
export function parseRecord11(input: Record11[]): Record11[] {
  const seen = new Set<string>()
  const out: Record11[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRecord11(input: Record11[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
