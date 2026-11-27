// workers: save a token (16)
export type Token16 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 230

/** Save a token for the workers area, refusing past LIMIT. */
export function saveToken16(input: Token16[]): Token16[] {
  const seen = new Set<string>()
  const out: Token16[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalToken16(input: Token16[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
