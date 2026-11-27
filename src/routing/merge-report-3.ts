// routing: merge a report (3)
export type Report3 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 73

/** Merge a report for the routing area, refusing past LIMIT. */
export function mergeReport3(input: Report3[]): Report3[] {
  const seen = new Set<string>()
  const out: Report3[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalReport3(input: Report3[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
