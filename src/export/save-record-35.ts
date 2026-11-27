// export: save a record (35)
export type Record35 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 67

/** Save a record for the export area, refusing past LIMIT. */
export function saveRecord35(input: Record35[]): Record35[] {
  const seen = new Set<string>()
  const out: Record35[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRecord35(input: Record35[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
