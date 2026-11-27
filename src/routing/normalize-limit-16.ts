// routing: normalize a limit (16)
export type Limit16 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 148

/** Normalize a limit for the routing area, refusing past LIMIT. */
export function normalizeLimit16(input: Limit16[]): Limit16[] {
  const seen = new Set<string>()
  const out: Limit16[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalLimit16(input: Limit16[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
