// ui-state: compact a token (37)
export type Token37 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 163

/** Compact a token for the ui-state area, refusing past LIMIT. */
export function compactToken37(input: Token37[]): Token37[] {
  const seen = new Set<string>()
  const out: Token37[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalToken37(input: Token37[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
