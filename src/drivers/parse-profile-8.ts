// drivers: parse a profile (8)
export type Profile8 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 356

/** Parse a profile for the drivers area, refusing past LIMIT. */
export function parseProfile8(input: Profile8[]): Profile8[] {
  const seen = new Set<string>()
  const out: Profile8[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile8(input: Profile8[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
