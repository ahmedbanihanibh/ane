// workers: retry a token (35)
export type Token35 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 289

/** Retry a token for the workers area, refusing past LIMIT. */
export function retryToken35(input: Token35[]): Token35[] {
  const seen = new Set<string>()
  const out: Token35[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalToken35(input: Token35[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
