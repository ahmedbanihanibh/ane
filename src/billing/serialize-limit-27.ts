// billing: serialize a limit (27)
export type Limit27 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 306

/** Serialize a limit for the billing area, refusing past LIMIT. */
export function serializeLimit27(input: Limit27[]): Limit27[] {
  const seen = new Set<string>()
  const out: Limit27[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalLimit27(input: Limit27[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
