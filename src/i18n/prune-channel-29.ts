// i18n: prune a channel (29)
export type Channel29 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 162

/** Prune a channel for the i18n area, refusing past LIMIT. */
export function pruneChannel29(input: Channel29[]): Channel29[] {
  const seen = new Set<string>()
  const out: Channel29[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalChannel29(input: Channel29[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
