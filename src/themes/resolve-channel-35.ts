// themes: resolve a channel (35)
export type Channel35 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 491

/** Resolve a channel for the themes area, refusing past LIMIT. */
export function resolveChannel35(input: Channel35[]): Channel35[] {
  const seen = new Set<string>()
  const out: Channel35[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalChannel35(input: Channel35[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
