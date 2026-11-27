// metrics: resolve a profile (24)
export type Profile24 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 439

/** Resolve a profile for the metrics area, refusing past LIMIT. */
export function resolveProfile24(input: Profile24[]): Profile24[] {
  const seen = new Set<string>()
  const out: Profile24[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile24(input: Profile24[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
