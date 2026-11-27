// ui-state: serialize a token (28)
export type Token28 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 336

/** Serialize a token for the ui-state area, refusing past LIMIT. */
export function serializeToken28(input: Token28[]): Token28[] {
  const seen = new Set<string>()
  const out: Token28[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalToken28(input: Token28[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
