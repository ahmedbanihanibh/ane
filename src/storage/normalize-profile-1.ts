// storage: normalize a profile (1)
export type Profile1 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 254

/** Normalize a profile for the storage area, refusing past LIMIT. */
export function normalizeProfile1(input: Profile1[]): Profile1[] {
  const seen = new Set<string>()
  const out: Profile1[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile1(input: Profile1[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
