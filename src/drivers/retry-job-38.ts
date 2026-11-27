// drivers: retry a job (38)
export type Job38 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 24

/** Retry a job for the drivers area, refusing past LIMIT. */
export function retryJob38(input: Job38[]): Job38[] {
  const seen = new Set<string>()
  const out: Job38[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalJob38(input: Job38[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
