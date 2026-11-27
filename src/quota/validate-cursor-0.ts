// quota: validate a cursor (0)
export type Cursor0 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 251

/** Validate a cursor for the quota area, refusing past LIMIT. */
export function validateCursor0(input: Cursor0[]): Cursor0[] {
  const seen = new Set<string>()
  const out: Cursor0[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalCursor0(input: Cursor0[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
