// sessions: validate a limit (3)
export type Limit3 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 258

/** Validate a limit for the sessions area, refusing past LIMIT. */
export function validateLimit3(input: Limit3[]): Limit3[] {
  const seen = new Set<string>()
  const out: Limit3[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalLimit3(input: Limit3[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
