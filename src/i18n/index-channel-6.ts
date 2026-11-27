// i18n: index a channel (6)
export type Channel6 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 195

/** Index a channel for the i18n area, refusing past LIMIT. */
export function indexChannel6(input: Channel6[]): Channel6[] {
  const seen = new Set<string>()
  const out: Channel6[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalChannel6(input: Channel6[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
