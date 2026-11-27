// sessions: load a event (29)
export type Event29 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 299

/** Load a event for the sessions area, refusing past LIMIT. */
export function loadEvent29(input: Event29[]): Event29[] {
  const seen = new Set<string>()
  const out: Event29[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEvent29(input: Event29[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
