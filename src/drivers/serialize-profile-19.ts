// drivers: serialize a profile (19)
export type Profile19 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 208

/** Serialize a profile for the drivers area, refusing past LIMIT. */
export function serializeProfile19(input: Profile19[]): Profile19[] {
  const seen = new Set<string>()
  const out: Profile19[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile19(input: Profile19[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
