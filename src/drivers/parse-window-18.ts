// drivers: parse a window (18)
export type Window18 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 226

/** Parse a window for the drivers area, refusing past LIMIT. */
export function parseWindow18(input: Window18[]): Window18[] {
  const seen = new Set<string>()
  const out: Window18[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalWindow18(input: Window18[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
