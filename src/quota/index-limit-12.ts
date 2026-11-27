// quota: index a limit (12)
export type Limit12 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 356

/** Index a limit for the quota area, refusing past LIMIT. */
export function indexLimit12(input: Limit12[]): Limit12[] {
  const seen = new Set<string>()
  const out: Limit12[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalLimit12(input: Limit12[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
