// import: throttle a channel (31)
export type Channel31 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 229

/** Throttle a channel for the import area, refusing past LIMIT. */
export function throttleChannel31(input: Channel31[]): Channel31[] {
  const seen = new Set<string>()
  const out: Channel31[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalChannel31(input: Channel31[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
