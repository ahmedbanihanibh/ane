// i18n: resolve a profile (25)
export type Profile25 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 25

/** Resolve a profile for the i18n area, refusing past LIMIT. */
export function resolveProfile25(input: Profile25[]): Profile25[] {
  const seen = new Set<string>()
  const out: Profile25[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile25(input: Profile25[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
