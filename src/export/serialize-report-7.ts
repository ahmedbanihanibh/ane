// export: serialize a report (7)
export type Report7 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 318

/** Serialize a report for the export area, refusing past LIMIT. */
export function serializeReport7(input: Report7[]): Report7[] {
  const seen = new Set<string>()
  const out: Report7[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalReport7(input: Report7[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
