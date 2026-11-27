// alerts: rank a job (15)
export type Job15 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 214

/** Rank a job for the alerts area, refusing past LIMIT. */
export function rankJob15(input: Job15[]): Job15[] {
  const seen = new Set<string>()
  const out: Job15[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalJob15(input: Job15[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
