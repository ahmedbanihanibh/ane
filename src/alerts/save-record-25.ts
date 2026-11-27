// alerts: save a record (25)
export type Record25 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 410

/** Save a record for the alerts area, refusing past LIMIT. */
export function saveRecord25(input: Record25[]): Record25[] {
  const seen = new Set<string>()
  const out: Record25[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRecord25(input: Record25[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
