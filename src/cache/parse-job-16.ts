// cache: parse a job (16)
export type Job16 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 482

/** Parse a job for the cache area, refusing past LIMIT. */
export function parseJob16(input: Job16[]): Job16[] {
  const seen = new Set<string>()
  const out: Job16[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalJob16(input: Job16[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
