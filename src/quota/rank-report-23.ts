// quota: rank a report (23)
export type Report23 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 155

/** Rank a report for the quota area, refusing past LIMIT. */
export function rankReport23(input: Report23[]): Report23[] {
  const seen = new Set<string>()
  const out: Report23[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalReport23(input: Report23[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
