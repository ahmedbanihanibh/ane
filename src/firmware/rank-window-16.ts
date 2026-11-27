// firmware: rank a window (16)
export type Window16 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 409

/** Rank a window for the firmware area, refusing past LIMIT. */
export function rankWindow16(input: Window16[]): Window16[] {
  const seen = new Set<string>()
  const out: Window16[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalWindow16(input: Window16[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
