// export: load a token (25)
export type Token25 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 143

/** Load a token for the export area, refusing past LIMIT. */
export function loadToken25(input: Token25[]): Token25[] {
  const seen = new Set<string>()
  const out: Token25[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalToken25(input: Token25[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
