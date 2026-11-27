// drivers: diff a record (14)
export type Record14 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 461

/** Diff a record for the drivers area, refusing past LIMIT. */
export function diffRecord14(input: Record14[]): Record14[] {
  const seen = new Set<string>()
  const out: Record14[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRecord14(input: Record14[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
