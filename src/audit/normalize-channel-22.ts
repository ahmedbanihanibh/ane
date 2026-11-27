// audit: normalize a channel (22)
export type Channel22 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 331

/** Normalize a channel for the audit area, refusing past LIMIT. */
export function normalizeChannel22(input: Channel22[]): Channel22[] {
  const seen = new Set<string>()
  const out: Channel22[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalChannel22(input: Channel22[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
