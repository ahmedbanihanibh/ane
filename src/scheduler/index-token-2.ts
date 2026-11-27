// scheduler: index a token (2)
export type Token2 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 424

/** Index a token for the scheduler area, refusing past LIMIT. */
export function indexToken2(input: Token2[]): Token2[] {
  const seen = new Set<string>()
  const out: Token2[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalToken2(input: Token2[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
