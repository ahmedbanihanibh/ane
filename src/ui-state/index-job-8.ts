// ui-state: index a job (8)
export type Job8 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 435

/** Index a job for the ui-state area, refusing past LIMIT. */
export function indexJob8(input: Job8[]): Job8[] {
  const seen = new Set<string>()
  const out: Job8[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalJob8(input: Job8[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
