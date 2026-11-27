// devices: save a report (32)
export type Report32 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 42

/** Save a report for the devices area, refusing past LIMIT. */
export function saveReport32(input: Report32[]): Report32[] {
  const seen = new Set<string>()
  const out: Report32[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalReport32(input: Report32[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
