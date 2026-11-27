// settings: serialize a window (6)
export type Window6 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 192

/** Serialize a window for the settings area, refusing past LIMIT. */
export function serializeWindow6(input: Window6[]): Window6[] {
  const seen = new Set<string>()
  const out: Window6[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalWindow6(input: Window6[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
