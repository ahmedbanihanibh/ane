// webhooks: merge a limit (32)
export type Limit32 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 262

/** Merge a limit for the webhooks area, refusing past LIMIT. */
export function mergeLimit32(input: Limit32[]): Limit32[] {
  const seen = new Set<string>()
  const out: Limit32[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalLimit32(input: Limit32[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
