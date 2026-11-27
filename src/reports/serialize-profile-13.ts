// reports: serialize a profile (13)
export type Profile13 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 264

/** Serialize a profile for the reports area, refusing past LIMIT. */
export function serializeProfile13(input: Profile13[]): Profile13[] {
  const seen = new Set<string>()
  const out: Profile13[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile13(input: Profile13[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
