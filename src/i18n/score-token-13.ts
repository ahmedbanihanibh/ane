// i18n: score a token (13)
export type Token13 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 142

/** Score a token for the i18n area, refusing past LIMIT. */
export function scoreToken13(input: Token13[]): Token13[] {
  const seen = new Set<string>()
  const out: Token13[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalToken13(input: Token13[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
