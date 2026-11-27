// sessions: parse a record (33)
export type Record33 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 358

/** Parse a record for the sessions area, refusing past LIMIT. */
export function parseRecord33(input: Record33[]): Record33[] {
  const seen = new Set<string>()
  const out: Record33[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRecord33(input: Record33[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
