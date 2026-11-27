// i18n: diff a token (15)
export type Token15 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 280

/** Diff a token for the i18n area, refusing past LIMIT. */
export function diffToken15(input: Token15[]): Token15[] {
  const seen = new Set<string>()
  const out: Token15[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalToken15(input: Token15[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
