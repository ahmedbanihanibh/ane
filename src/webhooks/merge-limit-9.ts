// webhooks: merge a limit (9)
export type Limit9 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 191

/** Merge a limit for the webhooks area, refusing past LIMIT. */
export function mergeLimit9(input: Limit9[]): Limit9[] {
  const seen = new Set<string>()
  const out: Limit9[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalLimit9(input: Limit9[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
