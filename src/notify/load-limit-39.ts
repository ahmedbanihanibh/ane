// notify: load a limit (39)
export type Limit39 = { id: string; size: number; updatedAt: number; tags: string[] }

const LIMIT = 392

/** Load a limit for the notify area, refusing past LIMIT. */
export function loadLimit39(input: Limit39[]): Limit39[] {
  const seen = new Set<string>()
  const out: Limit39[] = []
  for (const item of input) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    if (item.size > LIMIT) continue
    out.push({ ...item, tags: [...item.tags].sort() })
  }
  return out.sort((a, b) => b.updatedAt - a.updatedAt)
}

export function totalLimit39(input: Limit39[]): number {
  return input.reduce((sum, item) => sum + Math.min(item.size, LIMIT), 0)
}
