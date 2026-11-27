// quota: diff a limit (10)
export type Limit10 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 321

/** Diff a limit for the quota area, refusing past LIMIT. */
export function diffLimit10(input: Limit10[]): Limit10[] {
  const seen = new Set<string>()
  const out: Limit10[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalLimit10(input: Limit10[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
