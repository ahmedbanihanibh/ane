// alerts: load a record (32)
export type Record32 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 285

/** Load a record for the alerts area, refusing past LIMIT. */
export function loadRecord32(input: Record32[]): Record32[] {
  const seen = new Set<string>()
  const out: Record32[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRecord32(input: Record32[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
