// import: throttle a token (17)
export type Token17 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 233

/** Throttle a token for the import area, refusing past LIMIT. */
export function throttleToken17(input: Token17[]): Token17[] {
  const seen = new Set<string>()
  const out: Token17[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalToken17(input: Token17[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
