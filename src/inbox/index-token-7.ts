// inbox: index a token (7)
export type Token7 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 90

/** Index a token for the inbox area, refusing past LIMIT. */
export function indexToken7(input: Token7[]): Token7[] {
  const seen = new Set<string>()
  const out: Token7[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalToken7(input: Token7[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
