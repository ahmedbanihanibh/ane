// firmware: throttle a profile (29)
export type Profile29 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 71

/** Throttle a profile for the firmware area, refusing past LIMIT. */
export function throttleProfile29(input: Profile29[]): Profile29[] {
  const seen = new Set<string>()
  const out: Profile29[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile29(input: Profile29[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
