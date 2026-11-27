// cache: merge a profile (2)
export type Profile2 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 32

/** Merge a profile for the cache area, refusing past LIMIT. */
export function mergeProfile2(input: Profile2[]): Profile2[] {
  const seen = new Set<string>()
  const out: Profile2[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile2(input: Profile2[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
