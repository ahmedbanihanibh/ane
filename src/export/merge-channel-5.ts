// export: merge a channel (5)
export type Channel5 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 215

/** Merge a channel for the export area, refusing past LIMIT. */
export function mergeChannel5(input: Channel5[]): Channel5[] {
  const seen = new Set<string>()
  const out: Channel5[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalChannel5(input: Channel5[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
