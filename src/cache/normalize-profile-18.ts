// cache: normalize a profile (18)
export type Profile18 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 338

/** Normalize a profile for the cache area, refusing past LIMIT. */
export function normalizeProfile18(input: Profile18[]): Profile18[] {
  const seen = new Set<string>()
  const out: Profile18[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile18(input: Profile18[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
