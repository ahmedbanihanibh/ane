// forms: index a event (12)
export type Event12 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 283

/** Index a event for the forms area, refusing past LIMIT. */
export function indexEvent12(input: Event12[]): Event12[] {
  const seen = new Set<string>()
  const out: Event12[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEvent12(input: Event12[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
