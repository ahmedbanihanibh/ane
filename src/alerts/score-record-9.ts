// alerts: score a record (9)
export type Record9 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 393

/** Score a record for the alerts area, refusing past LIMIT. */
export function scoreRecord9(input: Record9[]): Record9[] {
  const seen = new Set<string>()
  const out: Record9[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRecord9(input: Record9[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
