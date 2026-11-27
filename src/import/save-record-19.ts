// import: save a record (19)
export type Record19 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 188

/** Save a record for the import area, refusing past LIMIT. */
export function saveRecord19(input: Record19[]): Record19[] {
  const seen = new Set<string>()
  const out: Record19[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRecord19(input: Record19[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
