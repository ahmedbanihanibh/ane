// sync: diff a channel (15)
export type Channel15 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 396

/** Diff a channel for the sync area, refusing past LIMIT. */
export function diffChannel15(input: Channel15[]): Channel15[] {
  const seen = new Set<string>()
  const out: Channel15[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalChannel15(input: Channel15[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
