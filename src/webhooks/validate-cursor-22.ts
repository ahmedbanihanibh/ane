// webhooks: validate a cursor (22)
export type Cursor22 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 447

/** Validate a cursor for the webhooks area, refusing past LIMIT. */
export function validateCursor22(input: Cursor22[]): Cursor22[] {
  const seen = new Set<string>()
  const out: Cursor22[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalCursor22(input: Cursor22[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
