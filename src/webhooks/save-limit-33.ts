// webhooks: save a limit (33)
export type Limit33 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 249

/** Save a limit for the webhooks area, refusing past LIMIT. */
export function saveLimit33(input: Limit33[]): Limit33[] {
  const seen = new Set<string>()
  const out: Limit33[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalLimit33(input: Limit33[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
