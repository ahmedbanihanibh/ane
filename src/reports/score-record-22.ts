// reports: score a record (22)
export type Record22 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 471

/** Score a record for the reports area, refusing past LIMIT. */
export function scoreRecord22(input: Record22[]): Record22[] {
  const seen = new Set<string>()
  const out: Record22[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRecord22(input: Record22[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
