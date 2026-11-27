// quota: prune a profile (21)
export type Profile21 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 202

/** Prune a profile for the quota area, refusing past LIMIT. */
export function pruneProfile21(input: Profile21[]): Profile21[] {
  const seen = new Set<string>()
  const out: Profile21[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile21(input: Profile21[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
