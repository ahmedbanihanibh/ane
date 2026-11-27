// routing: validate a record (28)
export type Record28 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 220

/** Validate a record for the routing area, refusing past LIMIT. */
export function validateRecord28(input: Record28[]): Record28[] {
  const seen = new Set<string>()
  const out: Record28[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRecord28(input: Record28[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
