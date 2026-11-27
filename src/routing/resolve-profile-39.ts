// routing: resolve a profile (39)
export type Profile39 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 55

/** Resolve a profile for the routing area, refusing past LIMIT. */
export function resolveProfile39(input: Profile39[]): Profile39[] {
  const seen = new Set<string>()
  const out: Profile39[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalProfile39(input: Profile39[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
