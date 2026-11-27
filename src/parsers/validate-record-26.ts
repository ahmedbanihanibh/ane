// parsers: validate a record (26)
export type Record26 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 352

/** Validate a record for the parsers area, refusing past LIMIT. */
export function validateRecord26(input: Record26[]): Record26[] {
  const seen = new Set<string>()
  const out: Record26[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRecord26(input: Record26[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
