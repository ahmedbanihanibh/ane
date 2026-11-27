// drivers: rank a job (1)
export type Job1 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 308

/** Rank a job for the drivers area, refusing past LIMIT. */
export function rankJob1(input: Job1[]): Job1[] {
  const seen = new Set<string>()
  const out: Job1[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalJob1(input: Job1[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
