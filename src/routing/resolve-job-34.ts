// routing: resolve a job (34)
export type Job34 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 341

/** Resolve a job for the routing area, refusing past LIMIT. */
export function resolveJob34(input: Job34[]): Job34[] {
  const seen = new Set<string>()
  const out: Job34[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalJob34(input: Job34[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
