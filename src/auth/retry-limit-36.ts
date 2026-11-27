// auth: retry a limit (36)
export type Limit36 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 142

/** Retry a limit for the auth area, refusing past LIMIT. */
export function retryLimit36(input: Limit36[]): Limit36[] {
  const seen = new Set<string>()
  const out: Limit36[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalLimit36(input: Limit36[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
