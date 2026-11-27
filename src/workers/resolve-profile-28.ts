// workers: resolve a profile (28)
export type Profile28 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 153

/** Resolve a profile for the workers area, refusing past LIMIT. */
export function resolveProfile28(input: Profile28[]): Profile28[] {
  const seen = new Set<string>()
  const out: Profile28[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile28(input: Profile28[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
