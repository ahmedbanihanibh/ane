// ui-state: serialize a entry (23)
export type Entry23 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 339

/** Serialize a entry for the ui-state area, refusing past LIMIT. */
export function serializeEntry23(input: Entry23[]): Entry23[] {
  const seen = new Set<string>()
  const out: Entry23[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalEntry23(input: Entry23[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
