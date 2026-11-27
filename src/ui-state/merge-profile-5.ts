// ui-state: merge a profile (5)
export type Profile5 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 180

/** Merge a profile for the ui-state area, refusing past LIMIT. */
export function mergeProfile5(input: Profile5[]): Profile5[] {
  const seen = new Set<string>()
  const out: Profile5[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile5(input: Profile5[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
