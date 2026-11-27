// forms: serialize a record (3)
export type Record3 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 26

/** Serialize a record for the forms area, refusing past LIMIT. */
export function serializeRecord3(input: Record3[]): Record3[] {
  const seen = new Set<string>()
  const out: Record3[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRecord3(input: Record3[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
