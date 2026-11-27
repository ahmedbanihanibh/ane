// routing: diff a window (1)
export type Window1 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 40

/** Diff a window for the routing area, refusing past LIMIT. */
export function diffWindow1(input: Window1[]): Window1[] {
  const seen = new Set<string>()
  const out: Window1[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalWindow1(input: Window1[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
