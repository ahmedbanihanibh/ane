// scheduler: load a limit (0)
export type Limit0 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 248

/** Load a limit for the scheduler area, refusing past LIMIT. */
export function loadLimit0(input: Limit0[]): Limit0[] {
  const seen = new Set<string>()
  const out: Limit0[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalLimit0(input: Limit0[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
