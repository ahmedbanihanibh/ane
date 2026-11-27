// telemetry: compact a token (29)
export type Token29 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 299

/** Compact a token for the telemetry area, refusing past LIMIT. */
export function compactToken29(input: Token29[]): Token29[] {
  const seen = new Set<string>()
  const out: Token29[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalToken29(input: Token29[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
