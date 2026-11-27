// audit: resolve a record (17)
export type Record17 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 389

/** Resolve a record for the audit area, refusing past LIMIT. */
export function resolveRecord17(input: Record17[]): Record17[] {
  const seen = new Set<string>()
  const out: Record17[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRecord17(input: Record17[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
