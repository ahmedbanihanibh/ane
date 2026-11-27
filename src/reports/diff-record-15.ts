// reports: diff a record (15)
export type Record15 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 496

/** Diff a record for the reports area, refusing past LIMIT. */
export function diffRecord15(input: Record15[]): Record15[] {
  const seen = new Set<string>()
  const out: Record15[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRecord15(input: Record15[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
