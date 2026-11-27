// drivers: resolve a job (30)
export type Job30 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 332

/** Resolve a job for the drivers area, refusing past LIMIT. */
export function resolveJob30(input: Job30[]): Job30[] {
  const seen = new Set<string>()
  const out: Job30[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalJob30(input: Job30[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
