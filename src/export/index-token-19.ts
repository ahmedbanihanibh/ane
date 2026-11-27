// export: index a token (19)
export type Token19 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 125

/** Index a token for the export area, refusing past LIMIT. */
export function indexToken19(input: Token19[]): Token19[] {
  const seen = new Set<string>()
  const out: Token19[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalToken19(input: Token19[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
