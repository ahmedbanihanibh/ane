// scheduler: rank a report (1)
export type Report1 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 400

/** Rank a report for the scheduler area, refusing past LIMIT. */
export function rankReport1(input: Report1[]): Report1[] {
  const seen = new Set<string>()
  const out: Report1[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalReport1(input: Report1[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
