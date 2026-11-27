// export: rank a token (11)
export type Token11 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 39

/** Rank a token for the export area, refusing past LIMIT. */
export function rankToken11(input: Token11[]): Token11[] {
  const seen = new Set<string>()
  const out: Token11[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalToken11(input: Token11[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
