// drivers: save a token (4)
export type Token4 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 486

/** Save a token for the drivers area, refusing past LIMIT. */
export function saveToken4(input: Token4[]): Token4[] {
  const seen = new Set<string>()
  const out: Token4[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalToken4(input: Token4[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
