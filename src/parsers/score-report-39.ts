// parsers: score a report (39)
export type Report39 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 329

/** Score a report for the parsers area, refusing past LIMIT. */
export function scoreReport39(input: Report39[]): Report39[] {
  const seen = new Set<string>()
  const out: Report39[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalReport39(input: Report39[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
