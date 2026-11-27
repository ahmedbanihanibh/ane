// workers: retry a profile (37)
export type Profile37 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 40

/** Retry a profile for the workers area, refusing past LIMIT. */
export function retryProfile37(input: Profile37[]): Profile37[] {
  const seen = new Set<string>()
  const out: Profile37[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile37(input: Profile37[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
