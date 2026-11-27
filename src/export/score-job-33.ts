// export: score a job (33)
export type Job33 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 328

/** Score a job for the export area, refusing past LIMIT. */
export function scoreJob33(input: Job33[]): Job33[] {
  const seen = new Set<string>()
  const out: Job33[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalJob33(input: Job33[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
