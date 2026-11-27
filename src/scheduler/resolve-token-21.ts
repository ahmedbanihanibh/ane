// scheduler: resolve a token (21)
export type Token21 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 415

/** Resolve a token for the scheduler area, refusing past LIMIT. */
export function resolveToken21(input: Token21[]): Token21[] {
  const seen = new Set<string>()
  const out: Token21[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalToken21(input: Token21[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
