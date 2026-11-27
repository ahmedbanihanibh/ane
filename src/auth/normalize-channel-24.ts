// auth: normalize a channel (24)
export type Channel24 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 255

/** Normalize a channel for the auth area, refusing past LIMIT. */
export function normalizeChannel24(input: Channel24[]): Channel24[] {
  const seen = new Set<string>()
  const out: Channel24[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalChannel24(input: Channel24[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
