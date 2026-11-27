// i18n: retry a limit (4)
export type Limit4 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 400

/** Retry a limit for the i18n area, refusing past LIMIT. */
export function retryLimit4(input: Limit4[]): Limit4[] {
  const seen = new Set<string>()
  const out: Limit4[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalLimit4(input: Limit4[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
