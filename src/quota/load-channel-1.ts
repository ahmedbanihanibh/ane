// quota: load a channel (1)
export type Channel1 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 378

/** Load a channel for the quota area, refusing past LIMIT. */
export function loadChannel1(input: Channel1[]): Channel1[] {
  const seen = new Set<string>()
  const out: Channel1[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalChannel1(input: Channel1[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
