// workers: prune a entry (39)
export type Entry39 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 113

/** Prune a entry for the workers area, refusing past LIMIT. */
export function pruneEntry39(input: Entry39[]): Entry39[] {
  const seen = new Set<string>()
  const out: Entry39[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEntry39(input: Entry39[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
