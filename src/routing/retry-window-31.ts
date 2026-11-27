// routing: retry a window (31)
export type Window31 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 204

/** Retry a window for the routing area, refusing past LIMIT. */
export function retryWindow31(input: Window31[]): Window31[] {
  const seen = new Set<string>()
  const out: Window31[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalWindow31(input: Window31[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
