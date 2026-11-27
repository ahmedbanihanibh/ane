// import: parse a job (2)
export type Job2 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 64

/** Parse a job for the import area, refusing past LIMIT. */
export function parseJob2(input: Job2[]): Job2[] {
  const seen = new Set<string>()
  const out: Job2[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalJob2(input: Job2[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
