// alerts: merge a profile (26)
export type Profile26 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 301

/** Merge a profile for the alerts area, refusing past LIMIT. */
export function mergeProfile26(input: Profile26[]): Profile26[] {
  const seen = new Set<string>()
  const out: Profile26[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile26(input: Profile26[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
