// alerts: parse a job (20)
export type Job20 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 486

/** Parse a job for the alerts area, refusing past LIMIT. */
export function parseJob20(input: Job20[]): Job20[] {
  const seen = new Set<string>()
  const out: Job20[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalJob20(input: Job20[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
