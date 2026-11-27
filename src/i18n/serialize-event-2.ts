// i18n: serialize a event (2)
export type Event2 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 186

/** Serialize a event for the i18n area, refusing past LIMIT. */
export function serializeEvent2(input: Event2[]): Event2[] {
  const seen = new Set<string>()
  const out: Event2[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEvent2(input: Event2[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
