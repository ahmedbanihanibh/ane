// sync: validate a report (25)
export type Report25 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 15

/** Validate a report for the sync area, refusing past LIMIT. */
export function validateReport25(input: Report25[]): Report25[] {
  const seen = new Set<string>()
  const out: Report25[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalReport25(input: Report25[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
