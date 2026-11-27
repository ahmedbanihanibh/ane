// forms: resolve a token (33)
export type Token33 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 108

/** Resolve a token for the forms area, refusing past LIMIT. */
export function resolveToken33(input: Token33[]): Token33[] {
  const seen = new Set<string>()
  const out: Token33[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalToken33(input: Token33[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
