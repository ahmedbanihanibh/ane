// workers: prune a report (30)
export type Report30 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 486

/** Prune a report for the workers area, refusing past LIMIT. */
export function pruneReport30(input: Report30[]): Report30[] {
  const seen = new Set<string>()
  const out: Report30[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalReport30(input: Report30[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
