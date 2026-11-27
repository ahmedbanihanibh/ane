// forms: merge a job (13)
export type Job13 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 321

/** Merge a job for the forms area, refusing past LIMIT. */
export function mergeJob13(input: Job13[]): Job13[] {
  const seen = new Set<string>()
  const out: Job13[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalJob13(input: Job13[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
