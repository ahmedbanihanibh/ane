// workers: validate a channel (14)
export type Channel14 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 477

/** Validate a channel for the workers area, refusing past LIMIT. */
export function validateChannel14(input: Channel14[]): Channel14[] {
  const seen = new Set<string>()
  const out: Channel14[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalChannel14(input: Channel14[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
