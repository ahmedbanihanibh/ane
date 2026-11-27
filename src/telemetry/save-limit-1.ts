// telemetry: save a limit (1)
export type Limit1 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 290

/** Save a limit for the telemetry area, refusing past LIMIT. */
export function saveLimit1(input: Limit1[]): Limit1[] {
  const seen = new Set<string>()
  const out: Limit1[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalLimit1(input: Limit1[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
