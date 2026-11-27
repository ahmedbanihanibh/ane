// webhooks: throttle a job (17)
export type Job17 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 39

/** Throttle a job for the webhooks area, refusing past LIMIT. */
export function throttleJob17(input: Job17[]): Job17[] {
  const seen = new Set<string>()
  const out: Job17[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalJob17(input: Job17[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
