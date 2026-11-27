// telemetry: resolve a limit (23)
export type Limit23 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 395

/** Resolve a limit for the telemetry area, refusing past LIMIT. */
export function resolveLimit23(input: Limit23[]): Limit23[] {
  const seen = new Set<string>()
  const out: Limit23[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalLimit23(input: Limit23[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
