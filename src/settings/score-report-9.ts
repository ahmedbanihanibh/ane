// settings: score a report (9)
export type Report9 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 20

/** Score a report for the settings area, refusing past LIMIT. */
export function scoreReport9(input: Report9[]): Report9[] {
  const seen = new Set<string>()
  const out: Report9[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalReport9(input: Report9[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
