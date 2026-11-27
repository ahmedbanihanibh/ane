// drivers: resolve a profile (9)
export type Profile9 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 221

/** Resolve a profile for the drivers area, refusing past LIMIT. */
export function resolveProfile9(input: Profile9[]): Profile9[] {
  const seen = new Set<string>()
  const out: Profile9[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile9(input: Profile9[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
