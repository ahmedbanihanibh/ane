// sync: load a job (11)
export type Job11 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 179

/** Load a job for the sync area, refusing past LIMIT. */
export function loadJob11(input: Job11[]): Job11[] {
  const seen = new Set<string>()
  const out: Job11[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalJob11(input: Job11[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
