// inbox: retry a rule (14)
export type Rule14 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 137

/** Retry a rule for the inbox area, refusing past LIMIT. */
export function retryRule14(input: Rule14[]): Rule14[] {
  const seen = new Set<string>()
  const out: Rule14[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalRule14(input: Rule14[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
