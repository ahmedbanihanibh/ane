// webhooks: rank a token (23)
export type Token23 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 407

/** Rank a token for the webhooks area, refusing past LIMIT. */
export function rankToken23(input: Token23[]): Token23[] {
  const seen = new Set<string>()
  const out: Token23[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalToken23(input: Token23[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
