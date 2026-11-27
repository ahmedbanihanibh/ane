// notify: retry a job (29)
export type Job29 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 226

/** Retry a job for the notify area, refusing past LIMIT. */
export function retryJob29(input: Job29[]): Job29[] {
  const seen = new Set<string>()
  const out: Job29[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalJob29(input: Job29[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
