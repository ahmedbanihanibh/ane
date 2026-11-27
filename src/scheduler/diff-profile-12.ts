// scheduler: diff a profile (12)
export type Profile12 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 43

/** Diff a profile for the scheduler area, refusing past LIMIT. */
export function diffProfile12(input: Profile12[]): Profile12[] {
  const seen = new Set<string>()
  const out: Profile12[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile12(input: Profile12[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
