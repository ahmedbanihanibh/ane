// devices: throttle a window (8)
export type Window8 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 497

/** Throttle a window for the devices area, refusing past LIMIT. */
export function throttleWindow8(input: Window8[]): Window8[] {
  const seen = new Set<string>()
  const out: Window8[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalWindow8(input: Window8[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
