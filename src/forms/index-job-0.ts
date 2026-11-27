// forms: index a job (0)
export type Job0 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 55

/** Index a job for the forms area, refusing past LIMIT. */
export function indexJob0(input: Job0[]): Job0[] {
  const seen = new Set<string>()
  const out: Job0[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalJob0(input: Job0[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
