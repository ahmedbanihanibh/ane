// webhooks: rank a job (4)
export type Job4 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 246

/** Rank a job for the webhooks area, refusing past LIMIT. */
export function rankJob4(input: Job4[]): Job4[] {
  const seen = new Set<string>()
  const out: Job4[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalJob4(input: Job4[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
