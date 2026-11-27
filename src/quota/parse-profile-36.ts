// quota: parse a profile (36)
export type Profile36 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 213

/** Parse a profile for the quota area, refusing past LIMIT. */
export function parseProfile36(input: Profile36[]): Profile36[] {
  const seen = new Set<string>()
  const out: Profile36[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile36(input: Profile36[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
