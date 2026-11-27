// import: diff a job (32)
export type Job32 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 462

/** Diff a job for the import area, refusing past LIMIT. */
export function diffJob32(input: Job32[]): Job32[] {
  const seen = new Set<string>()
  const out: Job32[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalJob32(input: Job32[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
