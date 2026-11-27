// telemetry: resolve a report (35)
export type Report35 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 291

/** Resolve a report for the telemetry area, refusing past LIMIT. */
export function resolveReport35(input: Report35[]): Report35[] {
  const seen = new Set<string>()
  const out: Report35[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalReport35(input: Report35[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
