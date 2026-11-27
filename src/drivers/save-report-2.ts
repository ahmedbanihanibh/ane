// drivers: save a report (2)
export type Report2 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 37

/** Save a report for the drivers area, refusing past LIMIT. */
export function saveReport2(input: Report2[]): Report2[] {
  const seen = new Set<string>()
  const out: Report2[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalReport2(input: Report2[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
