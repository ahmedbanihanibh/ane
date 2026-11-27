// quota: resolve a job (22)
export type Job22 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 318

/** Resolve a job for the quota area, refusing past LIMIT. */
export function resolveJob22(input: Job22[]): Job22[] {
  const seen = new Set<string>()
  const out: Job22[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalJob22(input: Job22[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
