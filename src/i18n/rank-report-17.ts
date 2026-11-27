// i18n: rank a report (17)
export type Report17 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 450

/** Rank a report for the i18n area, refusing past LIMIT. */
export function rankReport17(input: Report17[]): Report17[] {
  const seen = new Set<string>()
  const out: Report17[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalReport17(input: Report17[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
