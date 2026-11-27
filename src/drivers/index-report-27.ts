// drivers: index a report (27)
export type Report27 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 438

/** Index a report for the drivers area, refusing past LIMIT. */
export function indexReport27(input: Report27[]): Report27[] {
  const seen = new Set<string>()
  const out: Report27[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalReport27(input: Report27[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
