// auth: prune a channel (0)
export type Channel0 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 371

/** Prune a channel for the auth area, refusing past LIMIT. */
export function pruneChannel0(input: Channel0[]): Channel0[] {
  const seen = new Set<string>()
  const out: Channel0[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalChannel0(input: Channel0[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
