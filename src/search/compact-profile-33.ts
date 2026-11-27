// search: compact a profile (33)
export type Profile33 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 367

/** Compact a profile for the search area, refusing past LIMIT. */
export function compactProfile33(input: Profile33[]): Profile33[] {
  const seen = new Set<string>()
  const out: Profile33[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile33(input: Profile33[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
