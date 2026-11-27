// cache: rank a profile (21)
export type Profile21 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 98

/** Rank a profile for the cache area, refusing past LIMIT. */
export function rankProfile21(input: Profile21[]): Profile21[] {
  const seen = new Set<string>()
  const out: Profile21[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile21(input: Profile21[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
