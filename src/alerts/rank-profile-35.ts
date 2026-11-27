// alerts: rank a profile (35)
export type Profile35 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 24

/** Rank a profile for the alerts area, refusing past LIMIT. */
export function rankProfile35(input: Profile35[]): Profile35[] {
  const seen = new Set<string>()
  const out: Profile35[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile35(input: Profile35[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
