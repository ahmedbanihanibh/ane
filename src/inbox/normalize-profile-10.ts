// inbox: normalize a profile (10)
export type Profile10 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 27

/** Normalize a profile for the inbox area, refusing past LIMIT. */
export function normalizeProfile10(input: Profile10[]): Profile10[] {
  const seen = new Set<string>()
  const out: Profile10[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile10(input: Profile10[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
