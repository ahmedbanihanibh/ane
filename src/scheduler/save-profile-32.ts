// scheduler: save a profile (32)
export type Profile32 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 86

/** Save a profile for the scheduler area, refusing past LIMIT. */
export function saveProfile32(input: Profile32[]): Profile32[] {
  const seen = new Set<string>()
  const out: Profile32[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile32(input: Profile32[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
