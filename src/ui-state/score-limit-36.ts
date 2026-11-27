// ui-state: score a limit (36)
export type Limit36 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 226

/** Score a limit for the ui-state area, refusing past LIMIT. */
export function scoreLimit36(input: Limit36[]): Limit36[] {
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
