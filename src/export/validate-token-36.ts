// export: validate a token (36)
export type Token36 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 186

/** Validate a token for the export area, refusing past LIMIT. */
export function validateToken36(input: Token36[]): Token36[] {
  const seen = new Set<string>()
  const out: Token36[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalToken36(input: Token36[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
