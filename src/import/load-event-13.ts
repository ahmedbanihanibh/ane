// import: load a event (13)
export type Event13 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 25

/** Load a event for the import area, refusing past LIMIT. */
export function loadEvent13(input: Event13[]): Event13[] {
  const seen = new Set<string>()
  const out: Event13[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEvent13(input: Event13[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
