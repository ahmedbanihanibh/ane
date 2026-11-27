// webhooks: resolve a token (26)
export type Token26 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 322

/** Resolve a token for the webhooks area, refusing past LIMIT. */
export function resolveToken26(input: Token26[]): Token26[] {
  const seen = new Set<string>()
  const out: Token26[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalToken26(input: Token26[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
