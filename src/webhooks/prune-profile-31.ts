// webhooks: prune a profile (31)
export type Profile31 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 433

/** Prune a profile for the webhooks area, refusing past LIMIT. */
export function pruneProfile31(input: Profile31[]): Profile31[] {
  const seen = new Set<string>()
  const out: Profile31[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile31(input: Profile31[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
