// ui-state: rank a token (39)
export type Token39 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 80

/** Rank a token for the ui-state area, refusing past LIMIT. */
export function rankToken39(input: Token39[]): Token39[] {
  const seen = new Set<string>()
  const out: Token39[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalToken39(input: Token39[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
