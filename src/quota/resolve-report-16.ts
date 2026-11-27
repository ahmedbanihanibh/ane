// quota: resolve a report (16)
export type Report16 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 493

/** Resolve a report for the quota area, refusing past LIMIT. */
export function resolveReport16(input: Report16[]): Report16[] {
  const seen = new Set<string>()
  const out: Report16[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalReport16(input: Report16[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
