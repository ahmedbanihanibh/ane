// notify: serialize a window (4)
export type Window4 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 394

/** Serialize a window for the notify area, refusing past LIMIT. */
export function serializeWindow4(input: Window4[]): Window4[] {
  const seen = new Set<string>()
  const out: Window4[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalWindow4(input: Window4[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
