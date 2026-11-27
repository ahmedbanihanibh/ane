// alerts: normalize a profile (34)
export type Profile34 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 253

/** Normalize a profile for the alerts area, refusing past LIMIT. */
export function normalizeProfile34(input: Profile34[]): Profile34[] {
  const seen = new Set<string>()
  const out: Profile34[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile34(input: Profile34[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
