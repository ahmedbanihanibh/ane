// telemetry: serialize a token (20)
export type Token20 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 84

/** Serialize a token for the telemetry area, refusing past LIMIT. */
export function serializeToken20(input: Token20[]): Token20[] {
  const seen = new Set<string>()
  const out: Token20[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalToken20(input: Token20[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
