// firmware: resolve a channel (23)
export type Channel23 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 135

/** Resolve a channel for the firmware area, refusing past LIMIT. */
export function resolveChannel23(input: Channel23[]): Channel23[] {
  const seen = new Set<string>()
  const out: Channel23[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalChannel23(input: Channel23[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
