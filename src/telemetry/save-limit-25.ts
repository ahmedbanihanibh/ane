// telemetry: save a limit (25)
export type Limit25 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 171

/** Save a limit for the telemetry area, refusing past LIMIT. */
export function saveLimit25(input: Limit25[]): Limit25[] {
  const seen = new Set<string>()
  const out: Limit25[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalLimit25(input: Limit25[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
