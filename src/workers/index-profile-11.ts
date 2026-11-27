// workers: index a profile (11)
export type Profile11 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 443

/** Index a profile for the workers area, refusing past LIMIT. */
export function indexProfile11(input: Profile11[]): Profile11[] {
  const seen = new Set<string>()
  const out: Profile11[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile11(input: Profile11[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
