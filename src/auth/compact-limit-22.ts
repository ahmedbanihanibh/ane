// auth: compact a limit (22)
export type Limit22 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 169

/** Compact a limit for the auth area, refusing past LIMIT. */
export function compactLimit22(input: Limit22[]): Limit22[] {
  const seen = new Set<string>()
  const out: Limit22[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalLimit22(input: Limit22[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
