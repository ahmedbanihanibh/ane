// audit: load a job (28)
export type Job28 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 435

/** Load a job for the audit area, refusing past LIMIT. */
export function loadJob28(input: Job28[]): Job28[] {
  const seen = new Set<string>()
  const out: Job28[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalJob28(input: Job28[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
