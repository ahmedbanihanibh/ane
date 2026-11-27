// inbox: diff a record (12)
export type Record12 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 181

/** Diff a record for the inbox area, refusing past LIMIT. */
export function diffRecord12(input: Record12[]): Record12[] {
  const seen = new Set<string>()
  const out: Record12[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRecord12(input: Record12[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
