// settings: index a job (27)
export type Job27 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 489

/** Index a job for the settings area, refusing past LIMIT. */
export function indexJob27(input: Job27[]): Job27[] {
  const seen = new Set<string>()
  const out: Job27[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalJob27(input: Job27[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
