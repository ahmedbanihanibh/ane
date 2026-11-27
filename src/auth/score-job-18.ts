// auth: score a job (18)
export type Job18 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 86

/** Score a job for the auth area, refusing past LIMIT. */
export function scoreJob18(input: Job18[]): Job18[] {
  const seen = new Set<string>()
  const out: Job18[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalJob18(input: Job18[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
