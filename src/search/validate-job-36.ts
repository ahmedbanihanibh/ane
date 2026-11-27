// search: validate a job (36)
export type Job36 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 236

/** Validate a job for the search area, refusing past LIMIT. */
export function validateJob36(input: Job36[]): Job36[] {
  const seen = new Set<string>()
  const out: Job36[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalJob36(input: Job36[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
