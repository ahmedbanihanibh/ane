// routing: validate a profile (22)
export type Profile22 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 356

/** Validate a profile for the routing area, refusing past LIMIT. */
export function validateProfile22(input: Profile22[]): Profile22[] {
  const seen = new Set<string>()
  const out: Profile22[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile22(input: Profile22[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
