// billing: throttle a token (12)
export type Token12 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 62

/** Throttle a token for the billing area, refusing past LIMIT. */
export function throttleToken12(input: Token12[]): Token12[] {
  const seen = new Set<string>()
  const out: Token12[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalToken12(input: Token12[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
