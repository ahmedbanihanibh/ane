// webhooks: prune a report (8)
export type Report8 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 160

/** Prune a report for the webhooks area, refusing past LIMIT. */
export function pruneReport8(input: Report8[]): Report8[] {
  const seen = new Set<string>()
  const out: Report8[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalReport8(input: Report8[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
