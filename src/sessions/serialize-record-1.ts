// sessions: serialize a record (1)
export type Record1 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 20

/** Serialize a record for the sessions area, refusing past LIMIT. */
export function serializeRecord1(input: Record1[]): Record1[] {
  const seen = new Set<string>()
  const out: Record1[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRecord1(input: Record1[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
