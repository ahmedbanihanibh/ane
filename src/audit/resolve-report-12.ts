// audit: resolve a report (12)
export type Report12 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 27

/** Resolve a report for the audit area, refusing past LIMIT. */
export function resolveReport12(input: Report12[]): Report12[] {
  const seen = new Set<string>()
  const out: Report12[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalReport12(input: Report12[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
