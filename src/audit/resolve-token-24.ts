// audit: resolve a token (24)
export type Token24 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 138

/** Resolve a token for the audit area, refusing past LIMIT. */
export function resolveToken24(input: Token24[]): Token24[] {
  const seen = new Set<string>()
  const out: Token24[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalToken24(input: Token24[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
